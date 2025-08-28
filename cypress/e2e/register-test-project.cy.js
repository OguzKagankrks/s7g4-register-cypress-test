describe('Register Page', () => {
  
  describe('Error Messages', () => {
    it('Name input throws error for 2 chars', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="isim-input"]').type('ab')
      cy.contains('İsim en az 3 karakter uzunluğunda olmalıdır.').should('be.visible')
    })

    it('Surname input throws error for 2 chars', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="soyisim-input"]').type('ab')
      cy.contains('Soyisim en az 3 karakter uzunluğunda olmalıdır.').should('be.visible')
    })

    it('The error displayed when a valid email address is not entered.', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="email-input"]').type('emre@wit.')
      cy.contains('Geçerli bir email adresi giriniz.').should('be.visible')
    })

    it('The error displayed when a valid password is not entered.', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="password-input"]').type('test1234!')
      cy.contains('Şifre en az 8 karakter uzunluğunda, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.').should('be.visible')
    })

    it('Button is disabled for unvalidated inputs', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="password-input"]').type('test1234!')
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })
  })
 })

