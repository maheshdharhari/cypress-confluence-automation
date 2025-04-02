/**
 * Test suite for Confluence Page Creation functionality.
 * This suite automates the creation of multiple pages in Confluence with dynamic content.
 * 
 * Dependencies:
 * - Custom Cypress commands (e.g., `cy.loginToConfluence`) defined in `commands.js`.
 * - Page Object Models: `CreatePage` and `ViewPage`.
 * - Constants: `SPACE_KEY` and `PARENT_PAGE_ID` from `../support/constants`.
 * 
 * Environment Variables:
 * - `iterations`: Number of pages to create (default: 5).
 * - `delay_ms`: Delay in milliseconds between page creations (default: 2000ms).
 * 
 * Test Cases:
 * - `should create multiple pages with dynamic content`: 
 *   Iteratively creates pages with unique titles and content, verifies successful creation, 
 *   and optionally waits before creating the next page.
 * 
 * Hooks:
 * - `beforeEach`: Logs into Confluence and navigates to the page creation URL.
 * 
 * Page Object Methods:
 * - `CreatePage.setTitle(title)`: Sets the title of the page.
 * - `CreatePage.setContent(content)`: Sets the content of the page.
 * - `CreatePage.publish()`: Publishes the page.
 * - `CreatePage.verifySuccess()`: Verifies that the page was successfully created.
 * - `ViewPage.verifyTitleContains(title)`: (Commented out) Verifies the page title contains the expected text.
 * 
 * Notes:
 * - The test dynamically constructs the page creation URL using `SPACE_KEY` and `PARENT_PAGE_ID`.
 * - Logs the progress of page creation using `cy.log`.
 * - Uses `cy.wait` to introduce a delay between iterations if specified.
 */
import CreatePage from '../pages/create.page'
import ViewPage from '../pages/view.page'
import { SPACE_KEY, PARENT_PAGE_ID } from '../support/constants'

describe('Confluence Page Creation', () => {
  beforeEach(() => {
    cy.loginToConfluence() // Custom command - see commands.js
    cy.visit(`/pages/createpage.action?spaceKey=${SPACE_KEY}&fromPageId=${PARENT_PAGE_ID}`)
  })

  it('should create multiple pages with dynamic content', () => {
    // Retrieve the number of iterations from environment variables or default to 5
    const iterations = Cypress.env('iterations') || 5
    // Retrieve the delay between page creations from environment variables or default to 2000ms
    const delay = Cypress.env('delay_ms') || 2000

    for (let i = 0; i < iterations; i++) {
      const title = `Automated Page ${Math.random().toString(36).substring(2, 10)}`;
      
      const content = `This is automated content for page ${i+1}`

      cy.log(`Creating page ${i+1}/${iterations}`)
      
      // Set the title of the page using the Page Object Model method
      CreatePage
        .setTitle(title) // Sets the page title to the dynamically generated value
        .setContent(content) // Sets the page content to the dynamically generated value
        .publish() // Publishes the page
        .verifySuccess() // Verifies that the page was successfully created

      //ViewPage.verifyTitleContains(title)
      
      // If not the last iteration, navigate back to the page creation URL and wait for the specified delay
      if (i < iterations - 1) {
        cy.visit(`/pages/createpage.action?spaceKey=${SPACE_KEY}&fromPageId=${PARENT_PAGE_ID}`) // Navigate to the page creation URL
        cy.wait(delay) // Wait for the specified delay before creating the next page
      }
    }
  })
})