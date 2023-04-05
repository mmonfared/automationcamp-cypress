export class DashboardPage {

    verifyProfileButtonExists(){
        return cy.get('p.oxd-userdropdown-name').should('be.visible')
    }
}
