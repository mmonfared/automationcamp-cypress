/// <reference types="Cypress" />

describe('Session 13', function (){
    it('Usage of its()', function (){
        cy.viewport(500,500)
        cy.visit("https://wikipedia.com")
        cy.window().its('innerWidth').should('eq', 500)
        let channel = {channelName: 'AutomationCamp'}
        cy.wrap(channel).its('channelName').should('eq', 'AutomationCamp')
    })
    it('Invoke to get text', function() {
        cy.visit('https://www.play1.automationcamp.ir/forms.html')
        cy.get('#check_javascript').click()
        cy.get('#check_validate').invoke('text').should('eq', 'JAVASCRIPT')
        cy.get('#check_validate').invoke('text').should('not.eq', 'PYTHON')
    })
    it('Invoke to get attribute', function(){
        cy.visit("https://wikipedia.com")
        cy.get("#js-link-box-it").invoke('attr', 'href').should('eq', '//it.wikipedia.org/')
    })
    it('Invoke to remove target', function(){
        cy.visit('https://www.play1.automationcamp.ir/multi_window.html')
        cy.get("#window1").invoke('removeAttr', 'target')
        cy.get("#window1").click()
        
    })
    it('Invoke a scroll function on window object', function(){
        cy.visit("https://wikipedia.com")
        cy.wait(500)
        cy.window().invoke('scrollTo', 300,300)
    })
})