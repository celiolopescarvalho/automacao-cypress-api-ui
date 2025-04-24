it('Deve garantir usuário e criar produto com token', () => {
  const produto = {
    nome: `Produto_${Math.random().toString(36).substring(2, 7)}`,
    preco: 100,
    descricao: 'Produto criado com Cypress',
    quantidade: 5
  };

  cy.garanteUsuarioLogado().then((token) => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: token
      },
      body: produto
    }).then((res) => {
      expect(res.status).to.eq(201);
      cy.log('Produto cadastrado com sucesso:', produto.nome);
    });
  });
});
