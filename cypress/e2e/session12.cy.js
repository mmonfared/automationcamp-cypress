/// <reference types="Cypress" />

describe('Session12 - Wrap', function () {
    const food = function (foodName, waitTime) {
        console.log('Promise begin...')
        return new Promise(resolve => {
            setTimeout( function () {
                console.log('Promise finished - Food is ready')
                resolve({Order: foodName})
            }, waitTime)
        })
    }

    it('Wrap yielded jQuery Objects', function () {

        cy.visit('https://www.play2.automationcamp.ir')
        cy.get("#fname").then(function($el){
            cy.wrap($el).type('AutomationCamp')
        })
    })
        

    it('Wrap Variables/Objects/Arrays etc', function () {

        // Variable
        let name = 'AutomationCamp'
        cy.wrap(name).should('eq', 'AutomationCamp')

        // Object Property
        let channel = {name: 'AutomationCamp', author: 'Mohammad'}
        cy.wrap(channel).should('have.a.property', 'author', 'Mohammad')
        

        // Array Item
        let myList = ['Apple', 'Banana', 'Cherry']
        cy.wrap(myList).should('include', 'Banana')
        
    })

    it('Wrap JavaScript Promises', function () {
        let dinner = food('Pizza', 3000)
        cy.wrap(dinner).should('have.a.property', 'Order', 'Pizza')
    })
})
