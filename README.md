# Desafio Pokémon

Este projeto é uma aplicação FullStack que permite registrar e listar pokémons de treinadores.

## 🐱‍🏍Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL
- **Docker**: Docker Compose para orquestração
- **Frontend**: (React, em andamento)

## 🚀Como Executar o Projeto

1. **Clone o repositório**
   
No bash
git clone https://github.com/feoliver-dev/desafio-pokemon.git
cd desafio-pokemon
docker-compose up --build

------------------------------------------------------------------------------------------------------------------
Isso vai iniciar:
API rodando em http://localhost:3006 
MySQL no container db (porta 3306 interna)

Acesso
Backend API: http://localhost:3006
Frontend: http://localhost:3000

ou no Swagger: http://localhost:3006/api-docs/ 
(Em Listar Pokemons há um erro, apenas no Swagger, que não consegui resolver a tempo. Mas funciona normalmente pelo navegador, curl e Postman)

------------------------------------------------------------------------------------------------------------------
🐳 Dependências Docker
Certifique-se de ter:

Docker

Docker Compose
