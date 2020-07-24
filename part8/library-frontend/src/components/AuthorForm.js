import React, { useState, useEffect, setError } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/queries'

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  const submit = (event) => {
    event.preventDefault()
    changeAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  const handleChange = (event)  => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <select onChange={handleChange} >
        
        {props.authors.map(x => <option value={x.name} key={x.id}>{x.name}</option>)}
      </select>

      <form onSubmit={submit}>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

      
    </div>
  )
}

export default AuthorForm