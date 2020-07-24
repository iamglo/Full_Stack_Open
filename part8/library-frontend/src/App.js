
import { gql, useQuery, useLazyQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client';
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import {ALL_AUTHORS, ALL_BOOKS, ME, BOOK_DETAILS, CREATE_BOOK} from './queries/queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const Login = (props) => {
  if (!props.show) {
    return null
  }

  return(
    <div>
        <h2>Login</h2>
          <LoginForm
          setToken={props.setToken}
          setError={props.notify}
        />
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultAuth = useQuery(ALL_AUTHORS)
  const resultBook = useQuery(ALL_BOOKS)
  const resultUser = useQuery(ME)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      setErrorMessage(`added book ${addedBook.title}`)
      setTimeout( () => setErrorMessage(null), 5000)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommended</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token  && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage} ></Notify>

      <Authors
        show={page === 'authors'}
        authors={resultAuth.data}
      />

      <Books
        show={page === 'books'}
        books={resultBook.data}
      />

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith}/> 

      <Login show={page === 'login'} 
        notify={notify}
        setToken={setToken}
        errorMessage={errorMessage}
       /> 

      <Recommended show={page === 'recommend'} 
        user={resultUser.data}
        books={resultBook.data}
       /> 

    </div>
  )
}

export default App