/// <reference types = 'cypress' />

describe('Session4', function () {
    it('1-What is async code?', function () {
        cy.visit("https://www.wikipedia.org/")
        cy.get("#js-link-box-en").click()
        cy.url().should('contain', 'Main_Page')
        cy.wait(3000)
        console.log("Test is finished")  // Will execute First!
    });
    it('2- What is .then()?', function () {
        cy.visit("https://www.wikipedia.org/")
        cy.get("#js-link-box-en").click()
        cy.url().should('contain', 'Main_Page')
        cy.wait(3000).then( (a) => {
            console.log("Test is finished")
        })
    });
    it('3- Assert text of input using then()', function () {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("#fname").type("Cypress").then( (el) => {
            let input_value = el.val()
            expect(input_value).to.eq("Cypress")
        })
    });
    it('4- Api assertion using then()', function () {
        fetch("https://api.spacexdata.com/v3/missions")
            .then( (resp) => resp.json())
            .then( (data) => {
                console.log(data)
            })
    });
    it('5- Random number: ⛔ NOT WORKING ', function () {
        cy.visit('random_number.html')
            .then(() => {
                let found7 = false
                while (!found7) {
                    // this schedules an infinite number
                    // of "cy.get..." commands, eventually crashing
                    // before any of them have a chance to run
                    // and set found7 to true
                    cy.get('#result').should('not.be.empty')
                        .invoke('text').then(parseInt)
                        .then((number) => {
                            if (number === 7) {
                                found7 = true
                                cy.log('Number **7** Found')
                            } else {
                                cy.wait(500, { log: false })
                                cy.reload()
                            }
                        })
                }
            })
    });
    it('5- Random number: ✅ CORRECT ', function () {
        const reloadAndCheck = () => {
            cy.get('#result').should('not.be.empty')
                .invoke('text').then(parseInt)
                .then((number) => {
                    if (number === 7) {
                        cy.log('Number **7** Found')
                        return
                    } else {
                        cy.wait(200)
                        cy.reload()
                        reloadAndCheck()
                    }
                })
        }
        cy.visit('random_number.html')
        reloadAndCheck()
    });
    it('6- Use for debugging', function () {
        cy.visit("https://www.play2.automationcamp.ir/index.html")
        cy.get("#fname").type("Cypress").then( (el) => {
            debugger
            let input_value = el.val()
            expect(input_value).to.eq("Cypres") // Typo in 'Cypress'
        })
    });
});