// Great form examples: https://docs.cypress.io/examples/examples/recipes.html

import user from '../fixtures/profile.json'

describe('There is a form on the page', function() {
	it('should be there', function() {
		cy.visit('http://www.liferay.com/request-a-demo')
		cy.get('.lrdcom-form').should.exist
	})
})

describe('Filling out the form correctly should lead to thank you page', function() {
	it('should show the thank you page upon finishing filling out the form', function() {
		cy.visit('http://www.liferay.com/request-a-demo')

		const selector = '#article244788fm '

		cy.get(selector + 'input[name=firstname]').type(user.firstName)
		cy.get(selector + 'input[name=lastname]').type(user.lastName)
		cy.get(selector + 'input[name=email]').type(user.email)
		cy.get(selector + 'input[name=phone]').type(user.phone)
		cy.get(selector + 'input[name=company]').type(user.company)
		cy.get(selector + 'select[name=country]').select(user.country)

		cy.get(selector).submit()
		cy.url().should('include', 'thank-you')
	})
})

// describe('Form with gated resource', function() {
// 	it('should build gated resource url correctly', function() {
// 		cy.visit('http://www.liferay.com/company/gartner/thank-you')

// 		cy.get('.lrdcom-form').then(function($a) {
// 			const resourceData = JSON.parse($a.attr('data-asset-info'))
// 			const resourceFolder = resourceData.asset_folder_id
// 			const resourceName = encodeURIComponent(resourceData.asset_name)

// 			let url = 'https://www.liferay.com/documents/10182'

// 			url = `${url}/${resourceFolder}/${resourceName}`

// 			cy.request(url).then(function(response) {
// 				expect(response.status).to.equal(200)
// 			})
// 		})
// 	})
// })

// describe('Checks that Hubspot forms API is up and running', function() {
// 	it('should return status of 200', function() {
// 		const baseUrl = 'https://forms.hubspot.com/uploads/form/v2'
// 		const portalId = Cypress.env('HUBSPOT_PORTAL_ID')
// 		const formId = user.testFormId

// 		cy
// 			.request({
// 				method: 'POST',
// 				url: `${baseUrl}/${portalId}/${formId}`,
// 				form: true,
// 				body: {
// 					email: user.email,
// 					firstname: 'test2',
// 				},
// 			})
// 			.then(function(response) {
// 				expect(response.status).to.equal(200)
// 			})
// 	})
// })

// describe('User contact is updated on hubspot', function() {
// 	it('should show user has submitted new form', function() {
// 		const apiKey = Cypress.env('HUBSPOT_API_KEY')
// 		const baseUrl = 'https://api.hubapi.com/contacts/v1/contact/vid'
// 		const url = `${baseUrl}/${user.id}/profile?hapikey=${apiKey}`

// 		cy.request(url).then(function(response) {
// 			expect(response.body.properties.firstname.value).to.equal('test2')
// 		})
// 	})
// })
