var pages = ['http://localhost:8000/']

describe('cyle through pages', function() {
	pages.forEach(page => {
		it('should have no js errors', function() {
			cy.log(`visiting ${page}`)
			cy.visit(page)
		})
	})
})
