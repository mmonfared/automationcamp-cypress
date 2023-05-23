/// <reference types='cypress'/>

describe("Session28 - cy.clock()", () => {
    it("1- Freeze clock", () => {
        const myTime = new Date(2014, 7, 25)
        cy.clock(myTime.getTime())
        cy.visit('https://browserspy.dk/date.php')
    })
    it.only("2- Tick forward", () => {
        cy.visit('https://www.play1.automationcamp.ir/expected_conditions.html')
        cy.get('#min_wait').clear().type(15)
        cy.get('#max_wait').clear().type(15)
        cy.get('#visibility_target').should('not.be.visible')
        cy.clock()
        cy.get('#visibility_trigger').click()
        cy.tick(15050)
        cy.get('#visibility_target').should('be.visible')
        // cy.clock().invoke('restore')
        cy.clock().then((clock) => {
            clock.restore()
        })
      })
})