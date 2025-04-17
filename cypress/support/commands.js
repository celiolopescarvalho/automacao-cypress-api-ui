// Criar usuário padrão
Cypress.Commands.add('criarUsuario', () => {
    const usuario = {
      nome: "João Teste",
      email: `joao${Date.now()}@teste.com`,
      password: "teste123",
      administrador: "true"
    };
  
    return cy.request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuario,
      failOnStatusCode: false
    }).then((res) => {
      return {
        id: res.body._id,
        usuarioCriado: usuario,
        res
      };
    });
  });
  
  // Criar usuário com variáveis
  Cypress.Commands.add('criarUsuarioComVariaveis', (nome, email, password, administrador) => {
    const usuario = {
      nome,
      email,
      password,
      administrador
    };
  
    return cy.request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuario,
      failOnStatusCode: false
    }).then((res) => {
      return {
        id: res.body._id,
        usuarioCriado: usuario,
        res
      };
    });
  });
  