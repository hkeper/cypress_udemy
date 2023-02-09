///<reference types="Cypress"/>

describe('Practice with web elements Suite', () => {
    
    it("checkboxes", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('[type="checkbox"]').check(['option2', 'option3']).should('be.checked')
    })

    it("static dropdown", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('select').select('option2').should('have.value', 'option2')
    })

    it("dynamic dropdown, hidden element, radio buttons", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#autocomplete').type('ind')

        cy.get('.ui-menu-item div').each(($el, index, list) => {
            if($el.text() === 'India'){
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value', 'India')


        //visible invisible
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
        
        //radio buttons        
        cy.get('[value="radio2"]').check().should('be.checked')
    })

    it.only("alerts windows", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()

        //window:alert is browser/app evensts
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

    })

});

