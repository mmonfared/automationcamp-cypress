/// <reference types='cypress'/>

describe('Session 23 - Debug', () => {
    it('1- StackTrace & Timetravel', () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.get('#check_python').click()
        cy.get('#check_validate').should('have.text', 'JAVA PYTHONN')
    })
    it('2- pause()', () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.get('#check_python').click().pause()
        // cy.pause()
        cy.get('#check_validate').should('have.text', 'JAVA PYTHON')
        cy.get('#check_validate').should('have.text', 'JAVA PYTHON')
    })
    it('3- debug()', () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.get('#check_python').click().debug()
        // debugger
        // cy.debug()
        cy.get('#check_validate').should('have.text', 'JAVA PYTHONN')
    })
    it('4- console log', () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        console.log("console.log")
        console.info('console.info')
        console.error('console.error')
        console.warn('console.warn')
        console.assert(2 == 3)
        console.assert(2 == 2)
        console.time("MyTimer")
        // do something
        console.timeEnd("MyTimer")
        let user = {
            name: "Jack",
            age: 33,
            job: "QA Automation Developer",
        }
        console.table(user)

        let cities = ["Washington", "Delhi", "London", "Stockholm"];
        console.table(cities)

        console.group("Console Group");
        console.log("First log in group");
        console.warn("second log in group");
        console.groupEnd();

    })
    it("5- cy.log()", () => {
        cy.log("Hello!")
        let x = ' How are you?'
        let y = ' Happy '
        let z = 1402
        cy.log('Hello', x, y, z)
    })
    it("6- Cypress.log()", () => {
        let creds = { email: "admin@automationcamp.ir", password: "123456" }
        cy.request('POST', 'https://global.api.clockify.me/auth/token',
            { email: creds.email, password: creds.password })
            .then(($resp) => {
                expect($resp.status).to.eq(200)
                window.localStorage.setItem('token', $resp.body.token)
                Cypress.log({
                    name: 'Set Token',
                    displayName: 'Login by API',
                    message: `User: ${creds.email}`,
                    consoleProps: () => {
                        return {
                            email: creds.email,
                            password: creds.password,
                            'token': $resp.body.token,
                        }
                    },
                })
            })
        cy.visit("https://app.clockify.me")
        cy.get("[data-cy=workspace-dropdown]").should('contain.text', 'Admin')
    })
    it("7- Log to stdout (terminal)", () => {
        // https://github.com/archfz/cypress-terminal-report
        // https://github.com/flotwig/cypress-log-to-output
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVAA')
    })
    it('8- Handle test fail' , () => {
        cy.on('fail', (e) => {
            console.error(e)
            throw e
        })
        expect(5).to.equal(20)
        /*
         e2e.js > Global config
         Cypress.on('fail', (error, runnable) => {
             debugger
             throw error
        }) 
        */
    })
    it('9- Handle app errors' , () => {
        cy.on('uncaught:exception', (e, runnable) => {
            console.log(e)
            console.log(runnable)
            // ignore the error
            return false
        })
        cy.visit('uncaught-exception.html')
        cy.get("#error").click()
        cy.wait(1500)

    })
    it('10- Screenshot' , () => {
        cy.visit('https://play1.automationcamp.ir/forms.html')
        cy.get('#check_java').click()
        cy.get('#check_validate').should('have.text', 'JAVA')
        cy.screenshot()
        cy.get('#check_python').click()
        cy.get('#check_validate')
        .should('have.text', 'JAVA PYTHON')
        .screenshot("element screenshot")

    })
})





