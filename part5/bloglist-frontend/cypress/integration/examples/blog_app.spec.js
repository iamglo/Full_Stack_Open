describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'gloria',
      username: 'gloria',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('gloria')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.alert').contains('wrong username')
    cy.get('html').should('not.contain', 'gloria logged in')
  })

  it('can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('gloria')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

describe('when logged in', function() {
  // beforeEach(cy.login({ username: 'gloria', password: 'salainen' }))

  describe('and a blog exists', function () {
    beforeEach(function () {
      cy.createNote({
        title: 'another note cypress',
        author: 'glora',
        url: 'sdfj'
      })
      cy.contains('another note cypress')
    })})

  it('a new blog can be created', function() {
    cy.contains('add blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.contains('create').click()
    cy.contains('a blog created by cypress')
  })

  it('it can be liked', function () {
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('1')
  })

})
