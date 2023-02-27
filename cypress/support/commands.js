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
require('cypress-downloadfile/lib/downloadFileCommand')

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

Cypress.Commands.add('loginUsingUI', (email, password) => {
    cy.session(email, () => {
        cy.visit("https://app.clockify.me/en/login")
        cy.get("input#email").type(email)
        cy.get("input#password").type(password)
        cy.get("button[type=submit]").click()
        cy.location('pathname').should('eq','/tracker')
    })
})

Cypress.Commands.add('loginUsingAPI', (email, password) => {
    cy.session(email, () => {
        cy.request('POST', 'https://global.api.clockify.me/auth/token', 
        {email: email, password: password})
        .then(($resp) => {
            expect($resp.status).to.eq(200)
            window.localStorage.clear()
            window.localStorage.setItem('token', $resp.body.token)
    })
    }, {cacheAcrossSpecs: true})
})

Cypress.Commands.add('logout', () => {
    // window.localStorage.clear()
    // cy.window().clearLocalStorage()
    cy.clearLocalStorage()
})

Cypress.Commands.add('addProduct', (bookName) => {
    cy.get('.product-title>a').each(($el, index, list) => {
        if ($el.text().includes(bookName)) {
            cy.get('.product-box-add-to-cart-button').eq(index).click()
        }
    })
})

Cypress.Commands.add('deleteFile', (filePath) => {
    cy.task('deleteFileTask', filePath)
})

Cypress.Commands.add('deleteFolder', (folderPath) => {
    cy.task('deleteFolderTask', folderPath)
})

Cypress.Commands.add('deleteDownloadsFolder', () => {
    cy.task('deleteFolderTask', Cypress.config('downloadsFolder'))
})
