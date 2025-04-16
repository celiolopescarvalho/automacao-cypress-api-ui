describe("ServeRest - API Usuários", () => {
    function criarUsuario() {
      const usuario = {
        nome: "João Teste",
        email: `joao${Date.now()}@teste.com`,
        password: "teste123",
        administrador: "true",
      };
  
      return cy
        .request({
          method: "POST",
          url: "https://serverest.dev/usuarios",
          body: usuario,
          failOnStatusCode: false,
        })
        .then((res) => {
          return {
            id: res.body._id,
            usuarioCriado: usuario,
          };
        });
    }
  
    function criarUsuarioComVariaveis(nome, email, password, administrador) {
      const usuario = {
        nome: nome,
        email: email,
        password: password,
        administrador: administrador,
      };
  
      return cy
        .request({
          method: "POST",
          url: "https://serverest.dev/usuarios",
          body: usuario,
          failOnStatusCode: false,
        })
        .then((res) => {
          return { id: res.body._id };
        });
    }
  
    context("sucesso", () => {
      it("deve criar um novo usuário com sucesso", () => {
        const usuario = {
          nome: "João Teste",
          email: `joao${Date.now()}@teste.com`,
          password: "teste123",
          administrador: "true",
        };
  
        cy.request({
          method: "POST",
          url: "https://serverest.dev/usuarios",
          body: usuario,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq("Cadastro realizado com sucesso");
          expect(res.body._id).to.exist;
        });
      });
    });
  });
  