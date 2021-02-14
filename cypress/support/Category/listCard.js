import faker from "faker"
import { category } from "../../Config/testedElements"

Cypress.Commands.add('getNumberOfListCards', () => {
    // Get quantity of list cards on current page (not all list cards from current category, just from current page)

    cy.get(category.listCard)
        .its("length")
        .then((numberOfListCards) => {
        return numberOfListCards
    })
})

Cypress.Commands.add('everyListCardHas', (testedElement) => {
    // Assert that every list card have tested element

    cy.get(category.listCard)
        .each((currentListCard, index) => {
        let currentIndex = ++index
        cy.wrap(currentListCard)
            .find(testedElement)
            .should('be.visible')
            .log('List card no. ' + currentIndex + ' have payment via Aukro badge.')
    })
})

Cypress.Commands.add('clickToNthListCard', (nthListCard) => {
    // Go to nth list card via click

    cy.get(category.listCard).eq(nthListCard).find('a').first().click()
})

Cypress.Commands.add('selectListCard', (numberOfListCards) => {
    // If there is even number of list cards, test will visit random list card

    if(numberOfListCards % 2 == 0) {
        let randomListCard = faker.random.number({max: numberOfListCards, min: 1})
        let randomListCardArrayNumber = randomListCard - 1

        cy.log('There is even number of list cards')
            .log('List card will be chosen by random. Continue to list card no. ' + randomListCard + '.')
            .clickToNthListCard(randomListCardArrayNumber)
    }
    // If there is odd number of list cards, test will visit middle one

    if(!(numberOfListCards % 2 == 0)) {
        let nthListCard = Math.floor(numberOfListCards / 2)
        cy.log('There is odd number of list cards')
            .log('Continue to middle list card, which is list card no. ' + `${nthListCard + 1}.`)
            .clickToNthListCard(nthListCard)
    }
})
