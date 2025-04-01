import CreatePage from '../pages/create.page'
import ViewPage from '../pages/view.page'
import { SPACE_KEY, PARENT_PAGE_ID } from '../support/constants'

describe('Confluence Page Creation', () => {
  beforeEach(() => {
    cy.loginToConfluence() // Custom command - see commands.js
    cy.visit(`/pages/createpage.action?spaceKey=${SPACE_KEY}&fromPageId=${PARENT_PAGE_ID}`)
  })

  it('should create multiple pages with dynamic content', () => {
    const iterations = Cypress.env('iterations') || 5
    const delay = Cypress.env('delay_ms') || 2000

    for (let i = 0; i < iterations; i++) {
      const title = `Automated Page ${i+1}`
      const content = `This is automated content for page ${i+1}`

      cy.log(`Creating page ${i+1}/${iterations}`)
      
      CreatePage
        .setTitle(title)
        .setContent(content)
        .publish()
        .verifySuccess()

      //ViewPage.verifyTitleContains(title)
      
      if (i < iterations - 1) {
        cy.visit(`/pages/createpage.action?spaceKey=${SPACE_KEY}&fromPageId=${PARENT_PAGE_ID}`)
        cy.wait(delay)
      }
    }
  })
})