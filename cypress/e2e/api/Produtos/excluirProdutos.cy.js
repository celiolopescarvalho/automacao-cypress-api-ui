describe('Excluir o primeiro produto da lista que não está em carrinho', () => {
  it('Deve excluir o primeiro produto possível retornado pelo GET /produtos', () => {
    cy.login().then((token) => {
      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos',
      }).then((res) => {
        expect(res.status).to.eq(200);
        const produtos = res.body.produtos;
        expect(produtos.length).to.be.greaterThan(0);

        const tentarExcluirProduto = (index = 0) => {
          if (index >= produtos.length) {
            cy.log('Nenhum produto pôde ser excluído');
            return;
          }

          const produto = produtos[index];
          cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/produtos/${produto._id}`,
            headers: {
              Authorization: token
            },
            failOnStatusCode: false,
          }).then((deleteRes) => {
            if (deleteRes.status === 200) {
              cy.log(`Produto "${produto.nome}" excluído com sucesso`);
              console.log(`Produto ${produto._id} excluído com sucesso`);
            } else if (
              deleteRes.status === 400 &&
              deleteRes.body.message.includes('produto que faz parte de carrinho')
            ) {
              cy.log(`Produto "${produto.nome}" está em um carrinho, tentando o próximo`);
              console.log(`Produto ${produto._id} não pôde ser excluído pois está em um carrinho`);
              tentarExcluirProduto(index + 1);
            } else {
              cy.log(`Erro ao excluir "${produto.nome}": ${deleteRes.body.message}`);
              console.log(`Erro ao tentar excluir ${produto._id}:`, deleteRes.body.message);
              tentarExcluirProduto(index + 1);
            }
          });
        };

        tentarExcluirProduto();
      });
    });
  });
});
