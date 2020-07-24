import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import nextId from "react-id-generator";


const Country = ({name, all}) => {
  const [index, setIndex] = useState(-1)

  var htmlId = nextId();

  if (index != -1){
    return (
      <div>
      <br></br>
      <b>{name}</b> <button onClick={() => setIndex(-1)}> Hide </button><br></br>
      capital: {all[index]["capital"] } <br></br>
      population:  {all[index]["population"]} <br></br>
      <b>languages</b> <br></br>
      {all[index]["languages"].map(l => <li id={htmlId}>{l.name}</li>)}

      <img src={all[index]['flag']} width="200" height="200"></img>
      </div>
    )
  }
  else {
    return (<div> {name} <button onClick={() => setIndex(all.findIndex(a => a.name === name))}> Show</button> </div>)
  }
}


const Display = ({country, htmlId, all}) => {
  if (country.length === 0){
    return (<div> Please enter a search term </div>)
  }
  else if (country.length > 10 ){
    return (<div> Please be more specific with your query </div>)
  } 
  else{
    return (country.map(c => <Country name={c} all={all}></Country>))
  }
}

const Input = ({setCountry, allCountries}) => {
  const update = (event) => {
    setCountry(allCountries.filter(c => c.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  
  return (<div>
    <form>
      find countries <input onChange ={update}/>
    </form></div>)
}

const App = () => {
  const [ country, setCountry ] = useState([]) 
  const [ allCountries, setAll] = useState([])
  const [ allData, setData] = useState([])

  var htmlId = nextId();

  useEffect(() => {
    axios 
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setData(response.data)
      setAll(response.data.map(c => c.name))
    })
  }, [])

  
  return (
    <div>
      <Input allCountries={allCountries} setCountry={setCountry}></Input>
      <Display country={country} htmlId={htmlId} all={allData}></Display>

    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
export default App
