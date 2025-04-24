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

// Editar usuário aleatório
Cypress.Commands.add('editarUsuarioAleatorio', () => {
  return cy.request('GET', 'https://serverest.dev/usuarios').then((res) => {
    const id = res.body.usuarios[0]._id;

    return cy.request({
      method: 'PUT',
      url: `https://serverest.dev/usuarios/${id}`,
      body: {
        nome: 'Usuário Atualizado',
        email: `usuario${Date.now()}@teste.com`,
        password: 'teste123',
        administrador: 'true'
      }
    });
  });
});

Cypress.Commands.add('login', () => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: {
      email: 'celiolopescarvalho1@gmail.com',
      password: 'teste123'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.authorization;
    expect(token).to.not.be.null;
    return token; // Retorna o token sem adicionar "Bearer"
  });
});

Cypress.Commands.add('verificaSeUsuarioExiste', (email) => {
  return cy.request({
    method: 'GET',
    url: 'https://serverest.dev/usuarios',
    qs: { email },
    failOnStatusCode: false
  }).then((res) => {
    return res.body.usuarios && res.body.usuarios.length > 0;
  });
});

Cypress.Commands.add('criarUsuario', () => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: 'Célio Automação',
      email: 'celiolopescarvalho1@gmail.com',
      password: 'teste123',
      administrador: 'true'
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('garanteUsuarioLogado', () => {
  const email = 'celiolopescarvalho1@gmail.com';

  return cy.verificaSeUsuarioExiste(email).then((existe) => {
    if (!existe) {
      return cy.criarUsuario().then(() => cy.login());
    } else {
      return cy.login();
    }
  });
});




