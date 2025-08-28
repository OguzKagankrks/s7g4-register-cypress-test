
beforeEach(() => {
  cy.visit('http://localhost:5173/')
})

describe('Register Page', () => {
  
  describe('Error Messages', () => {
  it('Name input throws error for 2 chars', () => {

    cy.get('[data-cy="isim-input"]').type('ab')

    cy.contains('İsim en az 3 karakter uzunluğunda olmalıdır.').should('be.visible')
  })
   it('Surname input throws error for 2 chars', () => {

    cy.get('[data-cy="soyisim-input"]').type('ab')
   
    cy.contains('Soyisim en az 3 karakter uzunluğunda olmalıdır.').should('be.visible')
  })
   it('The error displayed when a valid email address is not entered.', () => {

    cy.get('[data-cy="email-input"]').type('emre@wit.')
   
    cy.contains('Geçerli bir email adresi giriniz.').should('be.visible')
  })
     it('The error displayed when a valid password is not entered.', () => {

    cy.get('[data-cy="password-input"]').type('test1234!')
   
    cy.contains('Şifre en az 8 karakter uzunluğunda, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.').should('be.visible')
  })
   it('Button is disabled for unvalidated inputs', () => {

    cy.get('[data-cy="password-input"]').type('test1234!')

    cy.get('[data-cy="submit-button"]').should('be.disabled')
   
  })
 })
  describe('Successful Registration', () => {
   it('Form can be submitted when all inputs are valid', () => {

    cy.get('[data-cy="isim-input"]').type('Emre')
    cy.get('[data-cy="soyisim-input"]').type('Kaya')
    cy.get('[data-cy="email-input"]').type('emrekaya@gmail.com')
    cy.get('[data-cy="password-input"]').type('Test1234!')
    cy.get('[data-cy="submit-button"]').should('not.be.disabled')
  
   })
      it('Submits form on validated inputs', () => {

    cy.get('[data-cy="isim-input"]').type('Emre')
    cy.get('[data-cy="soyisim-input"]').type('Kaya')
    cy.get('[data-cy="email-input"]').type('emrekaya@gmail.com')
    cy.get('[data-cy="password-input"]').type('Test1234!')
    cy.get('[data-cy="submit-button"]').click()

    cy.get('[data-cy="response-message"]').should('be.visible')
     })
   })
 })
  
 
 
   