// cypress/e2e/teste/comando.cy.js
describe('Teste simples do comando customizado', () => {
  it('Executa cy.editarUsuarioAleatorio()', () => {
    cy.editarUsuarioAleatorio().then((res) => {
      cy.log('Usuário editado com sucesso:', res.body.message)
    })
  })
})