class CreatePage {
    elements = {
      titleInput: () => cy.get('#content-title'),
      editorFrame: () => cy.get('#wysiwygTextarea').next('iframe'),
      publishButton: () => cy.get('#rte-button-publish'),
      successMessage: () => cy.get('h1')
    }
  
    setTitle(title) {
      this.elements.titleInput().clear().type(title)
      return this
    }
  
    setContent(content) {
      // Try TinyMCE API first
      cy.window().then(win => {
        const editor = win.tinyMCE?.get('wysiwygTextarea')
        if (editor) {
          editor.setContent(`<p>${content}</p>`)
        } else {
          // Fallback to iframe manipulation
          this.elements.editorFrame()
            .its('0.contentDocument.body')
            .should('exist')
            .then(iframeBody => {
              cy.wrap(iframeBody).find('p').clear().type(content)
            })
        }
      })
      return this
    }
  
    publish() {
      this.elements.publishButton().click()
      return this
    }
  
    verifySuccess() {
      this.elements.successMessage().should('be.visible')
      return this
    }
  }
  
  export default new CreatePage()    publish() {
      }      return this      })        }            })    publish() {
      }      return this      })        }            })