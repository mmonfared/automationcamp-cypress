/// <reference types='cypress'/>
/// <reference types="cypress-iframe" />

describe('Session 27 - Cross Domain', () => {
    it('1- Cy Origin', () => {
        cy.visit('https://google.com')
        cy.get('[name=q]').type("cypress{enter}")
        cy.contains('Cypress: JavaScript').click()
        cy.origin('https://www.cypress.io/', () => {
            cy.get("a[href='/pricing']").click()
            cy.contains('Monthly').should('exist')
        })
    })
    it('2- Different origin in iFrame', () => {
        cy.visit('iframe-origin.html')
        cy.get('h1').should('have.text', 'AutomationCamp')
            cy.get("iframe").then(function($iFrame){
                const iFrameContents = $iFrame.contents().find('body')
                cy.wrap(iFrameContents).find("a[href='contact.html']").click()
                // cy.contains("Thank you for using this Website :)  ").should('exist')
            })
        cy.get('h2').should('have.text', 'iFrame with Different Origin')

    })
    it('3- Passing args', () => {
        cy.visit('https://wikipedia.com')
        let texts = []
        cy.get('#js-link-box-en').invoke('attr', 'title').then((title) => {
            texts.push(title)
        })
        cy.get('#js-link-box-ru').invoke('attr', 'title').then((title) => {
            texts.push(title)
        })
        cy.origin('play1.automationcamp.ir', { args: { texts } }, ({ texts }) => {
            cy.log(texts)
            cy.visit('/forms.html')
            cy.get('#notes').type(texts.join('|'))
        })
        
    })
    it('4- Yields', () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#notes')
        cy.origin('https://www.wikipedia.org', () => {
            cy.visit('/')
            cy.get('#js-link-box-en').invoke('attr', 'title')
        // }).should('contain', 'English')
        }).then((text)=> {
            cy.visit('https://play1.automationcamp.ir/forms.html')
            cy.get('#notes').type(text)
            cy.get('#notes').should('contain.value', 'English')
        })

    })

})

