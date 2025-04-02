# Confluence Page Creator Automation

![Cypress Version](https://img.shields.io/badge/cypress-12.0.0-brightgreen)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-blue)

A Cypress automation script for bulk creating pages in Atlassian Confluence with dynamic content.

## Features

- Creates multiple Confluence pages in sequence
- Automatically fills page titles and content
- Supports both TinyMCE API and fallback DOM manipulation
- Includes robust error handling and verification
- Configurable iteration count and delays

## Prerequisites

- Node.js (v16 or higher)
- Cypress (v12 or higher)
- Access to a Confluence instance
- Valid credentials for the Confluence space

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/confluence-page-creator.git
   cd confluence-page-creator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Edit the following in `cypress/support/constants.js`:

```javascript
export const SPACE_KEY = "YOUR_SPACE_KEY";
export const PARENT_PAGE_ID = "YOUR_PARENT_PAGE_ID";
```
### Updating `cypress.config.js` for Environment Variables

Modify the `cypress.config.js` file to include the following environment variable configuration:

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
   e2e: {
      setupNodeEvents(on, config) {
         // implement node event listeners here
      },
      env: {
         iterations: 5, // Default number of pages to create
         delay_ms: 2000, // Default delay between page creations in milliseconds
         CONFLUENCE_URL: 'YOUR_CONFLUENCE_URL', // Base URL of Confluence instance
         CONFLUENCE_USERNAME: 'YOUR_USER_NAME', // Login username
         CONFLUENCE_PASSWORD: 'YOUR_PASSWORD', // Login password
      },
   },
});
```
## Usage

1. Run the tests in headed mode (to watch execution):
   ```bash
   npx cypress open
   ```

2. Run in headless mode (for automation):
   ```bash
   npx cypress run
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONFLUENCE_URL` | Base URL of Confluence instance | Yes |
| `CONFLUENCE_USERNAME` | Login username | Yes |
| `CONFLUENCE_PASSWORD` | Login password | Yes |
| `ITERATIONS` | Number of pages to create | No (default:5) |
| `DELAY_MS` | Delay between page creations | No (default:2000) |

## File Structure

```
cypress/
├── e2e/
│   ├── confluence/
│   │   ├── pages/
│   │   │   ├── create.page.js         # Page object for creating Confluence pages
│   │   │   └── view.page.js           # Page object for viewing Confluence pages
│   │   ├── specs/
│   │   │   └── page-creation.spec.js  # Main test file for Confluence automation
│   ├── support/
│   │   ├── commands.js                # Custom Cypress commands
│   │   └── constants.js               # Constants used across tests
├── fixtures/
│   └── example.json                   # Example data for tests
├── screenshots/                       # Stores screenshots on test failures
├── cypress.config.js                  # Cypress configuration file
├── package.json                       # Project dependencies and scripts
├── package-lock.json                  # Dependency lock file
├── README.md                          # Project documentation (this file)
└── .gitignore                         # Files and directories to ignore in Git
```

## Troubleshooting

### Common Issues

1. **Timeout Errors**:
   - Increase timeouts in the test file
   - Add longer delays between actions
   - Verify network connectivity to Confluence

2. **Login Failures**:
   - Verify credentials are correct
   - Check if SSO requires special handling

3. **Editor Content Not Saving**:
   - Try increasing the delay before save
   - Verify TinyMCE API availability with `window.tinyMCE`

### Debugging Tips

1. Take screenshots on failure:
   ```javascript
   afterEach(function() {
     if (this.currentTest.state === 'failed') {
       cy.screenshot(this.currentTest.title);
     }
   });
   ```

2. Log network requests:
   ```javascript
   cy.intercept('**').as('requests');
   cy.wait('@requests');
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)