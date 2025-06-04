const express = require('express');
const router = express.Router();

let pokemons = [];

// Mesma lógica dos handlers aqui (CREATE, READ, UPDATE, DELETE)

router.post('/', (req, res) => {
  // Criar pokemon
});

router.get('/', (req, res) => {
  // Listar pokemons
});

router.get('/:id', (req, res) => {
  // Buscar pokemon por id
});

router.put('/:id', (req, res) => {
  // Atualizar pokemon
});

router.delete('/:id', (req, res) => {
  // Deletar pokemon
});

module.exports = router;
