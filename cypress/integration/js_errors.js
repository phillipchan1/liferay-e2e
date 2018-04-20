describe('cyle through pages on navigation and check for JS errors', function() {
	var pages = []

	before(function() {
		cy.visit('http://www-nightly.liferay.com')
		cy.get('nav.primary-nav a').then(anchors => {
			return new Cypress.Promise((resolve, reject) => {
				for (var prop in anchors) {
					var href = anchors[prop].href

					if (href) {
						pages.push(href)
					}
				}

				resolve(pages)
			})
		})
	})

	it('should have no js errors', function() {
		pages.forEach(page => {
			cy.log(page)
			cy.visit(page)
		})
	})
})
