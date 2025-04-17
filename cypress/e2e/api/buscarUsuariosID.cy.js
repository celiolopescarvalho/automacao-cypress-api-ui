describe("ServeRest - API Usuários", () => {
    context("buscar usuário por ID", () => {
      it("deve criar e buscar usuário pelo ID", () => {
        const usuario = {
          nome: "Carlos Buscador",
          email: `carlos${Date.now()}@teste.com`,
          password: "123456",
          administrador: "true"
        };
  
        cy.request({
          method: "POST",
          url: "https://serverest.dev/usuarios",
          body: usuario,
          failOnStatusCode: false
        }).then((resPost) => {
          expect(resPost.status).to.eq(201);
          const id = resPost.body._id;
  
          cy.request({
            method: "GET",
            url: `https://serverest.dev/usuarios/${id}`,
            failOnStatusCode: false
          }).then((resGet) => {
            expect(resGet.status).to.eq(200);
            expect(resGet.body).to.have.property("nome", usuario.nome);
            expect(resGet.body).to.have.property("email", usuario.email);
  
            cy.log(`Usuário buscado com sucesso: ${resGet.body.nome}`);
            console.log("👤 Usuário retornado:", resGet.body);
          });
        });
      });
    });
  });
  