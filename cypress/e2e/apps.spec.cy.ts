describe('run create-react-app', () => {
  it('should run the app successfully', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('run Next.js app', () => {
  it('should run the app successfully', () => {
    cy.visit('http://localhost:3001/')
  })
})
