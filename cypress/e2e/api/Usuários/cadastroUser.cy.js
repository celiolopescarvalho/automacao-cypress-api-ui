describe("ServeRest - API Usuários", () => {
  context("Criar Usuário", () => {
    it("deve criar usuário com dados dinâmicos", () => {
      const nome = "Maria Teste";
      const email = `maria${Date.now()}@teste.com`;
      const password = "senha321";
      const administrador = "false";

      cy.criarUsuarioComVariaveis(nome, email, password, administrador).then(({ res }) => {
        expect(res.status).to.eq(201);
        expect(res.body._id).to.exist;
        expect(res.body.message).to.eq("Cadastro realizado com sucesso");

        // Logs visuais no painel do Cypress
        cy.log(`Email: ${email}`);
        cy.log(`Senha: ${password}`);

        // Log no DevTools do navegador (console)
        console.log("Usuário criado:", { nome, email, password });
      });
    });
  });
});
