/// <reference types="cypress" />

describe("Cadastro de Usuário - UI", () => {
  let senhaUsuario = "teste123";

  beforeEach(() => {
    cy.visit("https://front.serverest.dev/cadastrarusuarios");

  });

  function preencherFormulario(nome, email, senha, isAdmin = false) {
    cy.get('[data-testid="nome"]').type(nome);
    cy.get('[data-testid="email"]').type(email);

    if (senha) {
      cy.get('[data-testid="password"]').type(senha);
    }

    if (isAdmin) {
      cy.get('[data-testid="checkbox"]').check().should("be.checked");
    } else {
      cy.get('[data-testid="checkbox"]').uncheck().should("not.be.checked");
    }
  }

  context("sucesso", () => {
    it("Deve criar um usuário com sucesso como admin", () => {
      const nomeAdmin = `João Admin ${Date.now()}`;
      const emailAdmin = `joao.admin${Date.now()}@teste.com`;

      preencherFormulario(nomeAdmin, emailAdmin, senhaUsuario, true);
      cy.get('[data-testid="cadastrar"]').click();

      cy.url({ timeout: 10000 }).should("include", "/admin/home");
      cy.contains(nomeAdmin).should("be.visible");
    });

    it("Deve criar um usuário com sucesso como usuário comum", () => {
      const nomeComum = `Maria Usuária ${Date.now()}`;
      const emailComum = `maria${Date.now()}@teste.com`;

      preencherFormulario(nomeComum, emailComum, senhaUsuario); 
      cy.get('[data-testid="cadastrar"]').click();

      cy.url({ timeout: 10000 }).should("include", "/home");
      cy.contains("Serverest Store").should("be.visible"); 
    });
  });

  context("exceções", () => {
    it("Deve exibir erro ao tentar cadastrar sem preencher nenhum campo", () => {
      cy.get('[data-testid="cadastrar"]').click();

      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("Email é obrigatório").should("be.visible");
      cy.contains("Password é obrigatório").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com email inválido", () => {
      preencherFormulario("Fulano Teste", "email-invalido@", senhaUsuario);
      cy.get('[data-testid="cadastrar"]').click();

      cy.get('input[type="email"]').then(($input) => {
        const mensagem = $input[0].validationMessage;
        expect(mensagem).to.not.be.empty;
      });
    });

    it("Deve exibir erro ao tentar cadastrar com email já existente", () => {
      const nome = "Usuário Existente";
      const email = "celiolopescarvalho@gmail.com"; // Usa um email que já tenha sido cadastrado antes
  
      preencherFormulario(nome, email, senhaUsuario);
      cy.get('[data-testid="cadastrar"]').click();
      cy.contains("Este email já está sendo usado").should("be.visible");
    });

    it("Deve validar campo senha não preenchido", () => {
      const nome = "Usuário Teste";
      const email = `emailunico${Date.now()}@test.com`;
      const senha = "";
  
      preencherFormulario(nome, email, senha);
      cy.get('[data-testid="cadastrar"]').click();
      cy.contains("Password é obrigatório").should("be.visible");
    });
  });
});
