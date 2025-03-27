# Sistema de Gestão de Contas a Pagar e a Receber

Este é um sistema simples de gestão de contas a pagar e a receber, projetado para facilitar o controle financeiro de clientes e fornecedores. O sistema permite realizar o cadastro de clientes e fornecedores, registrar contas a pagar e a receber, atualizar o status das contas e gerar relatórios básicos.

## Funcionalidades

- **Cadastro de Clientes e Fornecedores**: Adicione informações como nome, documento, telefone e email.
- **Cadastro de Contas a Pagar e a Receber**: Registre contas com descrições, valores, datas de vencimento e tipo (a pagar/a receber).
- **Controle de Status**: As contas podem ser marcadas como "Pendente", "Pago" ou "Vencido".
- **Relatórios Básicos**: Liste contas por cliente/fornecedor ou as contas vencidas.

## Tecnologias

- **Java 23**
- **MangoDB** (Banco de Dados)
- **React**

## Estrutura do Projeto

A arquitetura do sistema segue o padrão **MVC (Model-View-Controller)**:

- **model**: Classes que representam as entidades do sistema, como `ClienteFornecedor` e `Conta`.
- **dao**: Classes responsáveis pela persistência de dados no banco de dados.
- **service**: Camada de negócios que contém as regras de validação e lógica.
- **util**: Classe para configuração da conexão com o banco de dados.
- **main**: Classe principal com o menu interativo para o usuário.

## Como Rodar o Projeto

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/marcus-vi/FinanceBuddy.git
   cd gestao-contas

