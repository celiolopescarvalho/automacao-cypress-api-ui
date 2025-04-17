describe("ServeRest - API Usuários", () => {
    context("Listar nomes dos usuários", () => {
      it("deve retornar e exibir o nome de todos os usuários cadastrados", () => {
        cy.request({
          method: "GET",
          url: "https://serverest.dev/usuarios",
          failOnStatusCode: false
        }).then((res) => {
          // Valida se a requisição teve sucesso
          expect(res.status).to.eq(200);
  
          // Verifica se o retorno contém um array de usuários
          expect(res.body).to.have.property("usuarios");
          expect(res.body.usuarios).to.be.an("array");
  
          // Extrai e exibe os nomes dos usuários
          const nomes = res.body.usuarios.map((usuario) => usuario.nome);
  
          // Log visual no Cypress
          cy.log(`Nomes dos usuários: ${nomes.join(", ")}`);
  
          // Log detalhado no console do navegador
          console.log("Nomes dos usuários encontrados:");
          nomes.forEach((nome, index) => {
            console.log(`${index + 1}. ${nome}`);
          });
        });
      });
    });
  });
  