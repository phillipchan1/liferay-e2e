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

		cy.get('input[name=firstname]').type('TEST FIRST NAME')
		cy.get('input[name=lastname]').type('TEST LAST NAME')
		cy.get('input[name=email]').type('test@liferay.com')
		cy.get('input[name=phone]').type('5555555555')
		cy.get('input[name=company]').type('TEST COMPANY')
		cy.get('select[name=country]').select('United States')

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
