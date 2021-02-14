import {newsletter} from "../../Config/testedElements"

const userAgent = Cypress.config('userAgent')
const dontHandleUserAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

Cypress.Commands.add('handleNewsletterModal', () => {
    // Decide if we need handle poping newsletter modal. If we are on SSR page, then newsletter modal will not pop out.

    if (userAgent === dontHandleUserAgent)
        cy.log('There\'s no need to handle newsletter modal')
    else
        cy.closeNewsletterModal()
})

Cypress.Commands.add('closeNewsletterModal', () => {
    // If cookie does not exist, newsletter modal will pop out at random time. Wait until modal exist and then close it via close button.

    cy.getNewsletterCookie().then((cookieValue) => {
        if (!cookieValue) {
            cy.log('Newsletter modal will pop out in any moment.')
            cy.get(newsletter.newsletterModal, {timeout: 60000})
                .should('be.visible')
                .find(newsletter.newsletterCloseButton)
                .click()
            cy.get(newsletter.newsletterModal, {timeout: 60000})
                .should('not.exist')
                .log('Newsletter is now closed.')
        }
        if (cookieValue)
            cy.get(newsletter.newsletterModal, {timeout: 60000})
                .should('not.exist')
                .log('Newsletter modal will not pop out.')
    })
})
