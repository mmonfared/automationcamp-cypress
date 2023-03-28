
// Import commands.js using ES2015 syntax:
import './commands'
import './commands2'
import "cypress-real-events/support";
import "cypress-iframe"
require('cy-verify-downloads').addCustomCommand();
require('cypress-terminal-report/src/installLogsCollector')();
/*
Session 23
Cypress.on('fail', (error, runnable) => {
    debugger
    throw error
})
Cypress.on('uncaught:exception', (e, runnable) => {
    console.log(e)
    console.log(runnable)
    // ignore the error
    return false
})
*/
