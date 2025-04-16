/// <reference types="cypress" />

describe("Login", () => {
    const senhaUsuario = "teste123";
    const emailUsuario = `usuario${Date.now()}@teste.com`;
    const nomeUsuario = `Usuário Teste ${Date.now()}`;
  
    before(() => {
      // Cria o usuário via API
      cy.request("POST", "https://serverest.dev/usuarios", {
        nome: nomeUsuario,
        email: emailUsuario,
        password: senhaUsuario,
        administrador: "true",
      });
    });
  
    beforeEach(() => {
      cy.visit("/login");
    });
  
    context("sucesso", () => {
      it("Deve realizar login com sucesso", () => {
        cy.get('[data-testid="email"]').type(emailUsuario);
        cy.get('[data-testid="senha"]').type(senhaUsuario);
        cy.get('[data-testid="entrar"]').click();
  
        cy.url().should("include", "/admin/home");
        cy.contains("Bem Vindo Usuário").should("be.visible");
      });
    });
  
    context("exceções", () => {
      it("Deve exibir erro ao tentar logar sem preencher nenhum campo", () => {
        cy.get('[data-testid="entrar"]').click();
        cy.contains("Email é obrigatório").should("be.visible");
        cy.contains("Password é obrigatório").should("be.visible");
      });
  
      it("Deve exibir erro ao tentar logar com email inválido", () => {
        cy.get('[data-testid="email"]').type("email-invalido@");
        cy.get('[data-testid="senha"]').type("qualquer123");
        cy.get('[data-testid="entrar"]').click();
  
        cy.get('input[type="email"]').then(($input) => {
          const mensagem = $input[0].validationMessage;
          expect(mensagem).to.not.be.empty;
        });
      });
  
      it("Deve exibir erro ao tentar logar com email não cadastrado", () => {
        cy.get('[data-testid="email"]').type("naoexiste@teste.com");
        cy.get('[data-testid="senha"]').type("senha123");
        cy.get('[data-testid="entrar"]').click();
  
        cy.contains("Email e/ou senha inválidos").should("be.visible");
      });
  
      it("Deve exibir erro ao tentar logar com senha incorreta", () => {
        const emailValido = `valido${Date.now()}@teste.com`;
        const senhaCorreta = "teste123";
  
        cy.request("POST", "https://serverest.dev/usuarios", {
          nome: "Login Incorreto",
          email: emailValido,
          password: senhaCorreta,
          administrador: "true",
        });
  
        cy.get('[data-testid="email"]').type(emailValido);
        cy.get('[data-testid="senha"]').type("senhaErrada");
        cy.get('[data-testid="entrar"]').click();
  
        cy.contains("Email e/ou senha inválidos").should("be.visible");
      });
  
      it("Deve validar campo senha não preenchido", () => {
        cy.get('[data-testid="email"]').type("usuario@email.com");
        cy.get('[data-testid="entrar"]').click();
        cy.contains("Password é obrigatório").should("be.visible");
      });
    });
  });
  