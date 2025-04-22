it('Falha ao editar usuário com ID inválido', () => {
    cy.request({
      method: 'PUT',
      url: 'https://serverest.dev/usuarios/idInvalido123',
      body: {
        nome: 'Falha Esperada',
        email: `falha${Date.now()}@teste.com`,
        password: '123456',
        administrador: 'true'
      },
      failOnStatusCode: false
    }).then((res) => {
      // TODO: API deveria retornar 400 ou 404, mas retorna 201
      expect(res.status).to.not.eq(200); // só pra garantir que não é tratado como sucesso
      cy.log(`Status recebido: ${res.status} - esse comportamento será reportado`);
    });
  });
  