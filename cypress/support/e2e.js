/**
 * This file serves as a support file for Cypress end-to-end tests.
 * 
 * It imports custom Cypress commands from two locations:
 * 1. `./commands` - Local commands specific to the current project.
 * 2. `../e2e/confluence/support/commands` - Commands related to Confluence-specific test automation.
 * 
 * These imports extend Cypress's functionality, enabling the use of custom commands
 * throughout the test suite.
 */
import './commands'
import '../e2e/confluence/support/commands'