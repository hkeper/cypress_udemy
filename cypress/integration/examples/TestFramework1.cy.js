///<reference types="Cypress"/>
///<reference types="cypress-iframe"/>
import 'cypress-iframe'

describe('Test Framework', () => {

    before(() =>{
        cy.fixture('example').then(function(fixture_data) {
            this.data = fixture_data
        })
    })
    
    it.skip("Using test data from fixture", function() {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        cy.get('input[name="name"]').eq(0).type(this.data.name)
        cy.get('select').select(this.data.gender)

        cy.get(":nth-child(4) > .ng-valid").should('have.value', this.data.name)
        cy.get('input[name="name"]').eq(0).should("have.attr", "minlength", 2)
        cy.get('#inlineRadio3').should('be.disabled')

    })

    it("Custom actions", function() {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        cy.get('input[name="name"]').eq(0).type(this.data.name)
        cy.get('select').select(this.data.gender)

        cy.get(":nth-child(4) > .ng-valid").should('have.value', this.data.name)
        cy.get('input[name="name"]').eq(0).should("have.attr", "minlength", 2)
        cy.get('#inlineRadio3').should('be.disabled')

        cy.get(':nth-child(2) > .nav-link').click()
        cy.selectProduct("Blackberry")

    })


});

