const { table } = require("console")
const exp = require("constants")
const { wrap } = require("module")

describe('Our first suite', () => {

    it('first test', () => {

        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by class name
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder]')

        //by attribute name and value
        cy.get('[placeholder="Email"]')

        //by class and value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute value
        cy.get('input[placeholder="Email"]')

        //by two different element
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //the most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    it('Second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .parents('form')
            .find('.custom-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form')
            .find('[type="email"]')
    })


    it('then and wrap method', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        //selenium
        // const firstForm = cy.contains('nb-card','Using the Grid')
        // firstForm.find('[for="inputEmail1"]').should('contain','Email')
        // firstForm.find('[for="inputPassword2"]').should('contain','Password')
        // const secondForm =cy.contains('nb-card','Basic form')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')
        // secondForm.find('[for="exampleInputPassword1"]').should('contain','Password')

        //Cypress 
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const firstLabalName = firstForm.find('[for="inputEmail1"]').text()
            const firstLablePass = firstForm.find('[for="inputPassword2"]').text()
            expect(firstLabalName).to.equal('Email')
            expect(firstLablePass).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const secondLablePass = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(secondLablePass).to.equal(firstLablePass)
                cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')


            })


        })

    })

    it('invoke command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1.
        cy.get('[for="exampleInputEmail1"]')
                .should('contain', 'Email address')
                .should('have.class','label')
                .and('have.text','Email address')

        //2.
        cy.get('[for="exampleInputEmail1"]').then(lable => {
            expect(lable.text()).to.equal('Email address')
            expect(lable).to.have.class('label')
            expect(lable).to.have.text('Email address')


            //3.
            cy.get('[for="exampleInputEmail1"]').invoke('text').then(lable => {
                expect(lable).to.equal('Email address')

                cy.contains('nb-card', 'Basic form')
                    .find('nb-checkbox')
                    .click()
                    .find('.custom-checkbox')
                    .invoke('attr', 'class')
                    //.should('contains','checked')
                    .then(classValue => {
                        expect(classValue).to.contain('checked')
                    })

            })
        })

    })

    it('assert property', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.contains('nb-calendar-picker', '17').click()
            //cy.get('nb-calendar-picker').contains('17')click()
            cy.wrap(input).invoke('prop', 'value').should('contains', 'Aug 17, 2022')
        })


    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })

            cy.wrap(radioButtons)
                .eq(0)
                .should('be.not.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')

        })
    })

    it('checkboxes', () => {

        cy.visit('./')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({ force: true })
        // above line of code will only check the uncheck boxes,but not uncheck the check boxes
        //to uncheched the checkboxes, we need to use click() method
        // check() only used for input tag and for checkbox, radioButton
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(1).click({ force: true })



    })

    it('list and dropdowns', () => {
        cy.visit('./')

        //1. 
        // cy.get('[type="button"]').click()
        // cy.contains('nb-option',' Dark').click()
        // cy.get('[type="button"]').should('contain','Dark')
        // cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')

        //2.
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                console.log("Total Item count =>" + itemCount)
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

                if (index < 3)
                    cy.wrap(dropdown).click()

            })

        })
    })

    it('Web table', () => {
        cy.visit('./')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1.
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        })

        //2.
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Vishal')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Raymal')
            cy.wrap(tableRow).find('.nb-checkmark').click()

        })

        //2.a (Validation)
        cy.get('tbody tr').first().find('td').then(tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain', 'Vishal')
            cy.wrap(tableColumn).eq(3).should('contain', 'Raymal')

        })

        // 3.

        const age = [20, 30, 40, 200]
        cy.wrap(age).each(ageNo => {
            cy.get('thead').find('[placeholder="Age"]').clear().type(ageNo)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (ageNo == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', ageNo)
                }
            })
        })
    })

    it.only('datapicker example', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

       

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert= selectDayFromCurrent(56)
            cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
            cy.wrap(input).should('have.value',dateAssert)

        })

        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', { month: 'short' })
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"] ').click()
                    selectDayFromCurrent(day)    
                }
                else {
                    cy.get('nb-calendar-picker').find('[class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }

            })
            return dateAssert
        }

    })


    it('tool tip', ()=>{
            cy.visit('./')
            cy.contains('Modal & Overlays').click()
            cy.contains('Tooltip').click()

            cy.contains('nb-card','Colored Tooltips').contains('button','Default').click()
           // cy.get('[nbtooltipstatus="primary"]').trigger('mouseover') // To keep tootip displayed
            cy.get('nb-tooltip').should('contain','This is a tooltip')

    })

    it('Dilog box', () => {
        cy.visit('./')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1. [this is not good apprach, as it depends on window confirm event]
     /*   cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm)=> {
            expect(confirm).to.equal('Are you sure you want to delete?')

        }) */

        // 2.
     /*      const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')

        })  */

        // 3.
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm',()=> false)

    })


})


