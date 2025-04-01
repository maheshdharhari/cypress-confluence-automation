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
   npm install cypress --save-dev
   ```

## Configuration

Edit the following in `cypress/e2e/confluence.spec.js`:

```javascript
const CONFLUENCE_URL = "http://your-confluence-instance:port";
const SPACE_KEY = "YOUR_SPACE_KEY";
const PARENT_PAGE_ID = "YOUR_PARENT_PAGE_ID";
const ITERATIONS = 5; // Number of pages to create
const DELAY_BETWEEN_PAGES = 2000; // ms between creations
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

3. For CI/CD integration, set environment variables:
   ```bash
   export CONFLUENCE_USERNAME=your_username
   export CONFLUENCE_PASSWORD=your_password
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
confluence-page-creator/
├── cypress/
│   ├── e2e/
│   │   └── confluence.spec.js  # Main test file
│   ├── fixtures/               # Test data
│   └── support/                # Custom commands
├── cypress.config.js           # Cypress configuration
└── README.md                   # This file
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
```

## Key Features of This README:

1. **Badges** - Visual indicators for versions
2. **Clear Prerequisites** - Specifies exact requirements
3. **Configuration Section** - Shows what to modify
4. **Multiple Usage Options** - For different environments
5. **Environment Variables** - Well-documented configuration
6. **Troubleshooting Guide** - Helps with common issues
7. **Clean File Structure** - Visual project layout
8. **License Information** - Important for open source

To use this:
1. Copy this content to a file named `README.md` in your project root
2. Replace placeholder values (your-username, your-confluence-instance, etc.)
3. Customize any sections specific to your implementation
4. Commit and push to GitHub

Would you like me to add any additional sections or modify any part of this README?