it('Deve criar um produto com dados aleatórios', () => {
    const produto = {
      nome: `Produto_${Math.random().toString(36).substring(2, 7)}`,
      preco: 100,
      descricao: 'Descrição aleatória',
      quantidade: 5
    };
  
    // Imprime os dados do produto no console
    console.log(`Produto a ser criado:`);
    console.log(`Nome: ${produto.nome}`);
    console.log(`Descrição: ${produto.descricao}`);
    console.log(`Preço: ${produto.preco}`);
    console.log(`Quantidade: ${produto.quantidade}`);
  
    cy.login().then((token) => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: {
          Authorization: token
        },
        body: produto
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
  
        const idCriado = response.body._id;
  
        // Verificação extra com GET
        cy.request({
          method: 'GET',
          url: `https://serverest.dev/produtos/${idCriado}`
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.nome).to.eq(produto.nome);
        });
      });
    });
  });
  