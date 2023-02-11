///<reference types="Cypress"/>
///<reference types="cypress-iframe"/>
import 'cypress-iframe'

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

    it("alerts windows", () => {
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

    it.only("separate tabs, windows, frames", () => {
        //Cypress can't switch between tabs windows
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        
        //Remove html attribute target, to open in the seme tab/window
        // cy.get('#opentab').invoke('removeAttr', 'target').click()

        // cy.url().should('include', 'www.rahulshettyacademy.com')
        // cy.go('back')

        //Get url from href attribute and open it
        // cy.get('#opentab').then((el) => {
        //     const tUrl = el.prop('href')
        //     cy.visit(tUrl)
        //     cy.url().should('contain', 'www.rahulshettyacademy.com')
        //     cy.go('back')
            //For different domain
            // cy.origin('https://www.bbc.com/russian', () => {
            //     cy.visit('https://www.bbc.com/russian')
            //     cy.url().should('contain', 'bbc')
            //     cy.go('back')
            // })            
        // })

        //iFrames must to install package cypress-iframe
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('[href="mentorship"]').eq(0).click()
        cy.wait(500)
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })

    it("tables", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        
        cy.get('tr td:nth-child(2)').each(($el, index, list) =>{
            const tdText = $el.text()
            if(tdText.includes('Python')){
                //next() works only with get()
                cy.get('tr td:nth-child(2)').eq(index).next().then((price) => {
                    var tPrice = price.text()
                    expect(tPrice).to.equal("25")
                })
            }
        })
    })

    it("click hidden elements, mouse over", () => {
        cy.viewport(1280, 720)
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        
        //Make element visible by jQuery function show()
        //cy.get('div.mouse-hover-content').invoke('show')
        //Force click on the hidden element
        cy.contains('Top').click({force:true})
        cy.url().should('include', '#top')
        cy.get('div.mouse-hover-content').invoke('hide')
    })

});

