// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openLinkWithText', (linkText) => {

    cy.get('a').contains(linkText).click()
})

Cypress.Commands.add('getText', { prevSubject: true}, ($element) => {
    // prevSubject: [true, false, 'optional', 'element', 'window', 'document']
    return cy.wrap($element).invoke('text')
})

Cypress.Commands.add('getTextOptional', { prevSubject: 'optional'}, (subject) => {
    if (subject) {
        return cy.wrap(subject).invoke('text')
    } else {
        cy.get('h1').then(function ($el){
            return $el.text()
        })
    }
})

Cypress.Commands.add('UseListOfPreviousSubjects', { prevSubject: ['element', 'window', 'document'] }, ($element) => {
    // prevSubject: [true, false, 'optional', 'element', 'window', 'document']
    return cy.wrap($element).invoke('text')
})