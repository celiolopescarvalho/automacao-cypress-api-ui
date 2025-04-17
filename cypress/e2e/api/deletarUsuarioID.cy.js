describe("ServeRest - API Usuários", () => {
    context("deletar usuário por ID", () => {
      it("deve criar e deletar um usuário com sucesso", () => {
        const usuario = {
          nome: "Usuário Para Deletar",
          email: `delete${Date.now()}@teste.com`,
          password: "senha123",
          administrador: "true"
        };
  
        // Criação do usuário
        cy.request({
          method: "POST",
          url: "https://serverest.dev/usuarios",
          body: usuario,
          failOnStatusCode: false
        }).then((resPost) => {
          expect(resPost.status).to.eq(201); // Criação com sucesso
          const id = resPost.body._id;
  
          // Requisição DELETE correta
          cy.request({
            method: "DELETE",
            url: `https://serverest.dev/usuarios/${id}`,
            failOnStatusCode: false
          }).then((resDelete) => {
            expect(resDelete.status).to.eq(200); // Esperado ao deletar
            expect(resDelete.body.message).to.eq("Registro excluído com sucesso");
  
            cy.log(`🗑️ Usuário deletado com sucesso: ${id}`);
            console.log("Usuário deletado:", id);
          });
        });
      });
    });
  });
  