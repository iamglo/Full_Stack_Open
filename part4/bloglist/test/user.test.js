const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')


describe('when there is initially one user in db', () => {
  beforeEach(async () => {

    init = {
      username: 'root',
      name: "Matti Luukkainen",
      password: 'sekret'
    }

    await User.deleteMany({})
    user = new User(init)
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
//   test('creation fails with proper statuscode and message if username already taken', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'root',
//       name: 'Superuser',
//       password: 'salainen',
//     }

//     // const result = await api
//     //   .post('/api/users')
//     //   .send(newUser)
    
//     // console.log(result)
//     // await expect(api
//     //   .post('/api/users')
//     //   .send(newUser)).toContain('ValidationError')

//     // expect(result.body.error).toContain('ValidationError')

//     // const usersAtEnd = await helper.usersInDb()
//     // expect(usersAtEnd).toHaveLength(usersAtStart.length)
//   })
// })