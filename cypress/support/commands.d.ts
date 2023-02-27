/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Open any link using its text
         @param {string} linkName - text of the `a` tag of the link
         @example
         cy.openLinkWithText('Terms & Conditions')
         */
        openLinkWithText(linkName: string): Cypress.Chainable

        /**
         *
         * @param element
         */
        getText(element: Element): Cypress.Chainable
        getTextOptional(element: Element): Cypress.Chainable
        loginUsingUI(email: string, password: string): Cypress.Chainable
        loginUsingAPI(email: string, password: string): Cypress.Chainable
        logout(): Cypress.Chainable
        addProduct(bookName: string): Cypress.Chainable
        deleteFile(filePath: string): Cypress.Chainable
        deleteFolder(folderPath: string): Cypress.Chainable
        deleteDownloadsFolder(): Cypress.Chainable
    }
}

