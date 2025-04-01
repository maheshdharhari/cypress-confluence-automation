Cypress.Commands.add('loginToConfluence', (username, password) => {
    const user = username || Cypress.env('CONFLUENCE_USERNAME')
    const pass = password || Cypress.env('CONFLUENCE_PASSWORD')
  
    cy.session([user, pass], () => {
      cy.visit('/login.action')
      cy.get('#os_username').type(user)
      cy.get('#os_password').type(pass, { log: false })
      cy.get('#loginButton').click()
      cy.url().should('not.include', '/login.action')
      cy.get('#header').should('be.visible')
    })
  })