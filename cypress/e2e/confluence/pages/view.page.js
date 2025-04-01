class ViewPage {
    elements = {
      pageTitle: () => cy.get('#title-text')
    }
  
    verifyTitleContains(text) {
      this.elements.pageTitle().should('contain', text)
      return this
    }
  }
  
  export default new ViewPage()