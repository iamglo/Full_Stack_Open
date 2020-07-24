import React, {useState, useEffect} from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [filterGenre, setFilter] = useState('')
  const genres = books.map(x => x.genres).flat()

  const filt = (x) => {
    if (filterGenre !== '')
    {
      return x.genres.includes(filterGenre)
    }
    
    return true
  }

  useEffect(() => {
    if (props.books){
      setBooks(props.books.allBooks)
    }
  }, [props])

  if (!props.show) {
    return null
  }

  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(filt).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>


      <br></br>
      <h4> Filter </h4>
      {[...new Set(genres)].map(x => <button onClick={() => {
        setFilter(x)}}> {x} </button>)}
      <button onClick={() => setFilter('')}> All</button>
      
    </div>
  )
}

export default Books