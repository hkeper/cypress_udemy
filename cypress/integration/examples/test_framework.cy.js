///<reference types="Cypress"/>
///<reference types="cypress-iframe"/>
import 'cypress-iframe'
import HomePage from '../pageObjects/HomePage';
import ShopPage from '../pageObjects/ShopPage';

describe('Test Framework', () => {

    before(() =>{
        cy.fixture('example').then(function(fixture_data) {
            this.data = fixture_data
        })
    })
    
    it.skip("Using test data from fixture, config", function() {
        // Cypress.config("defaultCommandTimeout", 10000)

        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        cy.get('input[name="name"]').eq(0).type(this.data.name)
        cy.get('select').select(this.data.gender)

        cy.get(":nth-child(4) > .ng-valid").should('have.value', this.data.name)
        cy.get('input[name="name"]').eq(0).should("have.attr", "minlength", 2)
        cy.get('#inlineRadio3').should('be.disabled')

    })

    it("Custom actions with parametrizing data from json, Page objects", function() {
        const homePage = new HomePage()
        const shopPage = new ShopPage()

        cy.viewport(1280, 720)
        cy.visit(Cypress.env("shop_url"))//"https://rahulshettyacademy.com/angularpractice/")
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)

        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        homePage.getEditBox().should("have.attr", "minlength", 2)
        homePage.getEntrepreneurRadioButton().should('be.disabled')

        homePage.getShopTab().click()//.debug()
        //cy.pause()    
        this.data.productName.forEach(element => {
            cy.selectProduct(element)
        });

        shopPage.getCheckoutButton().click()

        cy.get(':nth-child(4) > :nth-child(5) > .btn').click()
        cy.get("#country").type("India")
        cy.get("a:contains('India')").click()
        cy.get("#checkbox2").check({force: true})
        cy.get("#checkbox2").should("be.checked")
        cy.get("input[type='submit']").click()
        //cy.get('.alert').should("include", "Success! Thank you! Your order will be delivered in next few weeks :-).")
        cy.get('.alert').should(($el) => {
            expect($el.text()).to.include("Success! Thank you! Your order will be delivered in next few weeks :-).");
          });

    })


});

