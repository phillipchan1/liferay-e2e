// Great form examples: https://docs.cypress.io/examples/examples/recipes.html

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

describe('Form with gated resource', function() {
	it('should build gated resource url correctly', function() {
		cy.visit('http://www.liferay.com/company/gartner/thank-you')

		cy.get('.lrdcom-form').then(function($a) {
			const resourceData = JSON.parse($a.attr('data-asset-info'))
			const resourceFolder = resourceData.asset_folder_id
			const resourceName = encodeURIComponent(resourceData.asset_name)

			let url = 'https://www.liferay.com/documents/10182'

			url = `${url}/${resourceFolder}/${resourceName}`

			cy.request(url).then(function(response) {
				expect(response.status).to.equal(200)
			})
		})
	})
})
