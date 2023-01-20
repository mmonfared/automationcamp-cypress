/// <reference types="Cypress" />

// Global Scope

// function declaration
function multiply (a, b) {
    return a * b
}

// function expression
const multiply2 = function (a, b) {
    return a * b
}

// arrow function
const multiply3 = (a, b) => {
    return a * b
}

console.log(multiply(2, 3))
console.log(multiply2(4, 5))
console.log(multiply3(5, 6))

// Cypress.Commands.add('name', () => {})

describe('session11-scopes1', function () {
    // Cypress.Commands.add('name', () => {})
    const describeScope = function (a, b) {
        return a * b
    }
    it('test1', function () {
        const testScope = function (a, b) {
            return a * b
        }
        let x = multiply(10, 1) // Global scope
        cy.log(x)
        let y = describeScope(10, 2)
        cy.log(y)
        let z = testScope(10, 3)
        cy.log(z)
    });
    it('test2', function () {
        let x = multiply(10, 1) // Global scope
        cy.log(x)
        let y = describeScope(10, 2)
        cy.log(y)
        // let z = testScope(10, 3)  // Error
    });
});

describe('session11-scopes2', function () {
    it('test3', function () {
        let x = multiply(10, 1) // Global scope
        cy.log(x)
        // let y = describeScope(10, 2)  // Error
        // let z = testScope(10, 3)   // Error
    });
});

describe('session11-custom_commands', function () {

    it('parentCommand', function () {
        cy.visit("https://wikipedia.org")
        cy.openLinkWithText('English')
    });
    it('childCommand', function () {
        cy.visit("https://en.wikipedia.org/wiki/Main_Page")
        cy.get("#mp-tfa").getText().should('contain', 'Rowling')
    });
    it('dualCommand', function () {
        cy.visit("https://play2.automationcamp.ir/")
        cy.getTextOptional().should('contain', 'Automation Testing') //parent
        cy.get('h4').first().getTextOptional().should('contain', 'photo') //child
    });
    it('Use commands2.js', function () {
        cy.visit("https://wikipedia.org")
        cy.openLinkWithTextCommand2('Italiano')
    });
});