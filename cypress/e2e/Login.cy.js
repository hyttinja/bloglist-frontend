describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("Log in to application")
    cy.get('#username')
    cy.get('#password')
    cy.get('#loginBtn')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Pepe')
      cy.get('#password').type('Pepe')
      cy.get('#loginBtn').click()
      cy.contains("Pepe is logged in")
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('WrongUsername')
      cy.get('#password').type('WrongPassword')
      cy.get('#loginBtn').click()
      cy.contains("Invalid username or password")
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Pepe')
      cy.get('#password').type('Pepe')
      cy.get('#loginBtn').click()
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('https://testurl.com')
      cy.get('#blogFormBtn').click()
      cy.contains('Test blog was created')

    })
    it('A blog can be liked', function() {
      cy.contains('show').click()
      cy.contains('likes 7')
      cy.contains('Like').click()
      cy.contains('likes 8')
    })
  })
  describe('When logged in and user has created a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('Pepe')
      cy.get('#password').type('Pepe')
      cy.get('#loginBtn').click()
      cy.contains('create blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('https://testurl.com')
      cy.get('#blogFormBtn').click()
    })
    it('The created blog can deleted', function() {
      cy.get('.showBtn').eq(2).click()
      cy.contains('Remove').click()
        

    })
  })
})