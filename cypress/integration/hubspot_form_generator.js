describe('random tests', function() {
	it('should be true', function() {
		cy.visit('http://www.liferay.com/request-a-demo');

		cy.get('#article244788_firstname input').type('TEST FIRST NAME');
		cy.get('#article244788_lastname input').type('TEST LAST NAME');
		cy.get('#article244788_email input').type('test@test.com');
		cy.get('#article244788_phone input').type('5555555555');
		cy.get('#article244788_company input').type('TEST COMPANY');

		cy.get('#article244788_country select').select('United States'); // Select the 'user-1' option

		cy.get('.lrdcom-form').submit();
		cy.url().should('include', 'thank-you');
	});
});
