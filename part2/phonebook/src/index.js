import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import phoneService from './services/phone'
import loginService from './services/login'
import './index.css'

const Name = ({id, name, number, setPersons, setMessage}) => {
  const deleteName = () => {
    if (window.confirm(`Delete ${name}?`)){
      phoneService
      .deletePerson(id)
      .then(p => {
        setPersons(p)
        setMessage(`${name} was successfully deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
    }
  }
  return(<div>{name} {number} <button onClick={deleteName}> Delete </button></div>)
}

const Filter = ({setFilter}) => {
  const filterDisplay = (event) => {
    setFilter(event.target.value.toLowerCase())
  }
  return(<div> filter shown with <input onChange={filterDisplay}/> </div>)
}

const PersonForm = ({
  handleNameChange, 
  handleNumChange, addNumber,
  newName, newNumber}) => {


  return(<div>

    <form onSubmit={addNumber}>
        <div>
          name: <input name = "name" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange = {handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
     <div>debug: {newName} {newNumber}</div>
  </div>)
}

const Numbers = ({persons, filt, setPersons, setMessage}) => {
  return (<div>
    {persons.filter(p => p.name.toLowerCase().includes(filt))
              .map(part => <Name key={part.id} id={part.id} name={part.name} 
              number={part.number} setPersons={setPersons}
              setMessage={setMessage}></Name>)}
  </div>)
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="update">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter] = useState('')
  const [ message, setMessage] = useState(null)
  const [ username, setUsername] = useState('') 
  const [ password, setPassword] = useState('') 
  const [ user, setUser] = useState(null)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  
  useEffect(() => {
    phoneService
    .getPersons()
    .then(response => {
      setPersons(response)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      phoneService.setToken(user.token)
    }
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const filt = persons.filter(p => p.name === newName)
    if (filt.length === 1){
      const updated = filt[0]
      if (window.confirm(`${newName} is already in the list. Replace the old one with the new one?`)){
        phoneService
        .updatePerson(updated.id, {name : updated.name, id: updated.id, number: newNumber}).then(response => {
          setPersons(persons.map(p => p.id !== updated.id ? p : response))
          setMessage(`${updated.name} was successfully updated`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }

    else{
      phoneService
        .setPersons({name : newName, number: newNumber})
        .then(p => {
          setPersons(persons.concat(p))
          setMessage(`${newName} was successfully added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      phoneService.setToken(user.Token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

    const phoneForm = () => (
    <form onSubmit={addNumber}>
      <input
        value={newNumber}
        onChange={handleNumChange}
      />
      <button type="submit">save</button>
    </form>  
  ) 

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}> </Notification>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {phoneForm()}
      </div>
      }
      
      <Filter setFilter={setFilter}></Filter>

      <br></br>
      <br></br>

      <PersonForm 
      newNumber={newNumber} 
      newName={newName}
      handleNameChange={handleNameChange}
      handleNumChange={handleNumChange}
      addNumber={addNumber}></PersonForm>

      <h2>Numbers</h2>

      <Numbers persons = {persons} filt={filter} setPersons={setPersons} setMessage={setMessage}></Numbers>
    </div>
  )
}
 

ReactDOM.render(<App/>, document.getElementById('root'))
export default App
