describe('There is a form on the page', function() {
	it('should be there', function() {
		cy.visit('http://www.liferay.com/request-a-demo')
		cy.get('.lrdcom-form').should.exist
	})
})

describe('Filling out the form correctly should lead to thank you page', function() {
	it('should show the thank you page upon finishing filling out the form', function() {
		cy.visit('http://www.liferay.com/request-a-demo')

		cy.get('#article244788_firstname input').type('TEST FIRST NAME')
		cy.get('#article244788_lastname input').type('TEST LAST NAME')
		cy.get('#article244788_email input').type('test@liferay.com')
		cy.get('#article244788_phone input').type('5555555555')
		cy.get('#article244788_company input').type('TEST COMPANY')
		cy.get('#article244788_country select').select('United States')

		cy.get('.lrdcom-form').submit()
		cy.url().should('include', 'thank-you')
	})
})
