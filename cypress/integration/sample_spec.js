describe('random tests', function() {
	it('should be true', function() {
		cy.visit('http://www.liferay.com/request-a-demo');

		cy.title().should('include', 'Kitchen Sink');
	});
});
