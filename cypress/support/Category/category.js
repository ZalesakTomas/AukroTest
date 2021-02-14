import {category} from "../../Config/testedElements"

const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('getAllTopLevelCategoriesPath', () => {
    // Save path of every L1 category to array

    let topLevelCategoriesPath = []

    cy.get(category.topLevelCategory)
        .each((topCategory) => {
            cy.wrap(topCategory)
                .invoke('attr', 'href')
                .then((categoryPath) => {
                    let categoryUrl = new URL(categoryPath, baseUrl)
                    topLevelCategoriesPath.push(categoryUrl)
                })
        })

    // Serve category paths from array

    cy.wrap(topLevelCategoriesPath)
        .each((categoryPath) => {
            return categoryPath
        })
})
