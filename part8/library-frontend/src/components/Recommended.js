import React, {useState, useEffect} from 'react'

const Recommended = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState([''])

  const filt = (array, g) => {
    return array.filter(x => (
        x.genres.includes(g)
      )
    )
  }

  useEffect(() => {
    if (props.books){
      setBooks(props.books.allBooks)
    }
    if (props.user){
      setGenre([...props.user.me.favoriteGenre])
    }
  }, [props])

  if (!props.show) {
    return null
  }

  
  return (
    <div>
      <h2>recommended</h2>
      {
        genre.map(x => {
          return (
          <div>
          <li>books in your favorite genre: <b>{x}</b></li>
          {filt(books, x).map(y => {
            return (
              <li> {y.title} </li>
            )
          })}
          </div>
          )
        }
        )
      }
    </div>
  )
}

export default Recommended