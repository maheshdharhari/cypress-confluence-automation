let testCounter = 0;
beforeEach(() => {
    testCounter++;
    if (testCounter % 2 === 1) { // Perform login every other test
      cy.login('admin', 'admin');
    }
  });