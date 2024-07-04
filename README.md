# Desafio Técnico - [FI.WebAtividadeEntrevista]

## Visão Geral
Este repositório contém a solução para o teste prático proposto pela [Função Sistemas]. 

### Resumo das Implementações

#### 1. Implementação do CPF do Cliente:
- *Tela de Cadastramento/Alteração de Clientes:*
  - [x] Adicionar campo "CPF".
  - [x] O campo deve seguir o padrão visual dos demais.
  - [x] Cadastramento obrigatório.
  - [x] Formatação padrão de CPF (999.999.999-99).
  - [x] Validação do CPF (dígito verificador).
  - [x] Impedir cadastro de CPF duplicado.

#### 2. Implementação do Botão Beneficiários:
- *Tela de Cadastramento/Alteração de Clientes:*
  - [x] Adicionar botão "Beneficiários".
  - [x] Abrir pop-up para inclusão de "CPF" e "Nome do beneficiário".
  - [x] Exibir grid com beneficiários cadastrados, permitindo alteração e exclusão.
  - [x] O botão e campos devem seguir o padrão visual dos demais.
  - [x] CPF com formatação padrão e validação.
  - [x] Impedir cadastro de beneficiário com CPF duplicado para o mesmo cliente.
  - [x] Gravar beneficiário no banco ao acionar "Salvar" na tela de "Cadastrar Cliente".
  - [x] Alterar beneficiário no banco ao acionar "Incluir" após clicar em "Alterar" no beneficiário.
  - [x] Excluir beneficiário no banco ao acionar "Excluir" na grid de beneficiários associados ao cliente.

### Ideias para Futuras Implementações:

- *Aplicação dos Princípios SOLID:*
  - [ ] Desacoplar mais o código, separando responsabilidades em classes distintas.
  - [ ] Implementar o princípio da Responsabilidade Única (SRP) em todas as classes.
  - [ ] Aplicar o princípio da Inversão de Dependência (DIP) utilizando injeção de dependência.

- *Melhorias na Arquitetura:*
  - [ ] Modularizar o código em diferentes camadas (apresentação, aplicação, domínio e infraestrutura).
  - [ ] Adotar o padrão de serviços para encapsular a lógica de negócios.

### Vídeo mostrando tudo que foi implementado na prática:

https://github.com/Wisch096/FI.WebAtividadeEntrevista/assets/107141762/01b4c467-017b-4e7d-8387-82217bab890e





