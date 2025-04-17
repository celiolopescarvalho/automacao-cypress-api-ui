# 🧪 Automacao Cypress API + UI - Serverest

Projeto de automação de testes utilizando **Cypress** para testar a **API e a interface web** do sistema [Serverest](https://front.serverest.dev/), com integração ao **Allure Reports** para geração de relatórios interativos.

---

## 🔧 Tecnologias e Ferramentas

- [Cypress](https://www.cypress.io/) - Framework de testes end-to-end
- [Allure Reports](https://docs.qameta.io/allure/) - Geração de relatórios de testes
- [Postman](https://www.postman.com/) e [SOAPUI](https://www.soapui.org/) - Testes e validações externas de API
- [Jira](https://www.atlassian.com/software/jira), [Zephyr](https://zephyrdocs.atlassian.net/) - Gestão de testes e defeitos
- [MongoDB](https://www.mongodb.com/), [SQL](https://www.mysql.com/) - Validações de banco
- [OpenShift](https://www.redhat.com/openshift) - Integração com ambientes

---

## 📁 Estrutura do Projeto

```bash
cypress/
├── e2e/
│   ├── api/         # Testes de API REST
│   └── ui/          # Testes da interface web
├── fixtures/        # Massa de dados mockadas
└── support/         # Commands customizados e configs globais
```

---

## 🚀 Como executar os testes

### Instalar dependências

```bash
yarn install
```

### Executar os testes com interface

```bash
yarn dev
```

### Executar todos os testes sem interface (modo headless + Allure)

```bash
yarn test:all
```

### Executar apenas API ou UI

```bash
yarn test:api
yarn test:ui
```

---

## 📊 Gerar e abrir relatório Allure

Após rodar os testes com Allure:

```bash
yarn report:allure
```

O relatório abrirá automaticamente no navegador.

---

## 💡 Sobre

Projeto desenvolvido por **Célio Lopes Carvalho** com foco em práticas modernas de QA:  
✔️ Testes funcionais  
✔️ API REST  
✔️ UI (end-to-end)  
✔️ Validação de dados  
✔️ Automatização e relatórios profissionais

---

## 📢 Contato

**Telefone:** 61 98407 1603
**Email:** celiolopescarvalho@gmail.com  
**LinkedIn:** [linkedin.com/in/celio-lopes-carvalho](https://www.linkedin.com/in/celio-lopes-carvalho/)
