/**
 * Custom Cypress command to log in to Confluence.
 * 
 * This command uses the `cy.session` API to cache the session for the given
 * username and password, reducing the need to log in repeatedly during tests.
 * If no username or password is provided, it falls back to using environment
 * variables `CONFLUENCE_USERNAME` and `CONFLUENCE_PASSWORD`.
 * 
 * @function loginToConfluence
 * @param {string} [username] - The username for Confluence login. Defaults to `Cypress.env('CONFLUENCE_USERNAME')`.
 * @param {string} [password] - The password for Confluence login. Defaults to `Cypress.env('CONFLUENCE_PASSWORD')`.
 * 
 * @example
 * // Using environment variables
 * cy.loginToConfluence();
 * 
 * @example
 * // Providing username and password explicitly
 * cy.loginToConfluence('myUsername', 'myPassword');
 */
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