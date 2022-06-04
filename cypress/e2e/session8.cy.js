/// <reference types = 'cypress' />

// Root level hooks
before( function (){
    cy.log('Root level suite SETUP')
})
after( function (){
    cy.log('Root level suite TEARDOWN')
})
beforeEach(function (){
    cy.log('Root level test SETUP')
})
afterEach(function (){
    cy.log('Root level test TEARDOWN')
})

describe('Describe Block1', function (){
    before( function (){
        cy.log('Run BEFORE describe block1')
    })
    after( function (){
        cy.log('Run AFTER describe block1')
    })
    beforeEach(function (){
        cy.log('Test SETUP1')
    })
    afterEach(function (){
        cy.log('Test TEARDOWN1')
    })


    it.only('Test 1 inside Describe Block1', function (){
        cy.log('Test 1 inside Describe Block1')
    })
    it('Test 2 inside Describe Block1', function (){
        cy.log('Test 2 inside Describe Block1')
    })

})

describe('Describe Block2', function (){
    before( function (){
        cy.log('Run BEFORE describe block2')
    })
    after( function (){
        cy.log('Run AFTER describe block2')
    })
    beforeEach(function (){
        cy.log('Test SETUP2')
    })
    afterEach(function (){
        cy.log('Test TEARDOWN2')
    })


    it('Test 1 inside Describe Block2', function (){
        cy.log('Test 1 inside Describe Block2')
    })
    it('Test 2 inside Describe Block2', function (){
        cy.log('Test 2 inside Describe Block2')
    })

})

context('Context Block1', function (){
    specify('Test 1 inside Context Block1', function (){
        cy.log('Test 1 inside Context Block1')
    })

})

context.skip('Context Block2', function (){
    specify.only('Test 1 inside Context Block2', function (){
        cy.log('Test 1 inside Context Block2')
    })

})
