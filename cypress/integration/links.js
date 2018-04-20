var exceptions = ['javascript', 'struts_action', 'tel:', 'linkedin']

describe('cyle through pages', function() {
	var allLinks = {}
	var pages = []

	function isException(term) {
		if (!term) {
			return true
		}

		for (let p = 0; p < exceptions.length; p++) {
			if (term.includes(exceptions[p])) {
				return true
			}
		}

		return false
	}

	before(function() {
		cy.visit('http://www.liferay.com')
		cy
			.get('nav.primary-nav a')
			.then(anchors => {
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
			.then(pages => {
				console.log(pages)

				pages.forEach(page => {
					cy.visit(page)
					cy.get('html a').then(anchors => {
						return new Cypress.Promise((resolve, reject) => {
							for (var prop in anchors) {
								var href = anchors[prop].href

								if (!isException(href)) {
									if (!allLinks[href]) {
										allLinks[href] = {
											page: href,
											foundOn: new Set(),
										}
									}

									allLinks[href]['foundOn'].add(page)
								}
							}

							resolve()
						})
					})
				})
			})
	})

	it('should have all links navigation working', function() {
		console.log(allLinks)
		for (var prop in allLinks) {
			cy.log(allLinks[prop]['foundOn'])

			cy.request(allLinks[prop]['page']).then(page => {
				return new Cypress.Promise((resolve, reject) => {
					expect(page.status).to.eq(200)

					resolve()
				})
			})
		}
	})
})
