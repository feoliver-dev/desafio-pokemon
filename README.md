# Desafio Pokémon

Este projeto é uma aplicação FullStack que permite registrar e listar pokémons de treinadores.

## 🐱‍🏍Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL
- **Docker**: Docker Compose para isolar e orquestrar a API e banco de dados.
- **Frontend**: (React, em andamento)

## 🚀Como Executar o Projeto

1. **Clone o repositório** (bash)

git clone https://github.com/feoliver-dev/desafio-pokemon.git

cd desafio-pokemon

npm install

docker-compose up --build

npm run test:docker (teste com Jest e Supertest)

------------------------------------------------------------------------------------------------------------------
Isso vai iniciar:
API rodando em http://localhost:3006 
MySQL no container db (porta 3306 interna)

Acesso
Backend API: http://localhost:3006
Frontend: http://localhost:3000
Swagger: http://localhost:3006/api-docs/ 
(Funciona normalmente pelo navegador, curl e Postman.)
 
------------------------------------------------------------------------------------------------------------------
🐳 Dependências Docker
Certifique-se de ter:

Docker

Docker Compose
