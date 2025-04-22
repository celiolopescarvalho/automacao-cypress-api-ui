describe('Listar todos os produtos', () => {
    it('Deve retornar todos os produtos cadastrados', () => {
      cy.request('https://serverest.dev/produtos').then((response) => {
        console.log('Produtos recebidos:', response.body.produtos) 
        cy.log(`Quantidade de produtos: ${response.body.quantidade}`) 
  
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade')
        expect(response.body).to.have.property('produtos')
        expect(response.body.produtos).to.be.an('array')
        expect(response.body.produtos.length).to.be.greaterThan(0)
      })
    })
  })
  