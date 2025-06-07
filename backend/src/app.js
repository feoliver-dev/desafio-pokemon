const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const pool = require('./connection');
const { body, param, validationResult } = require('express-validator');
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(pokemonRoutes);
app.use(batalhaRoutes);

const validTipos = ['charizard', 'mewtwo', 'pikachu'];

// Validações
const validarPokemon = [
  body('tipo')
    .isString().withMessage('Tipo deve ser uma string')
    .isIn(validTipos).withMessage('Tipo inválido'),

  body('treinador')
    .isString().withMessage('Treinador deve ser uma string')
    .notEmpty().withMessage('Treinador é obrigatório')
];

const validarId = [
  param('id')
    .isInt().withMessage('ID deve ser um número inteiro')
];

// 1.1 Criar Pokemon
app.post('/pokemons', async (req, res) => {
  try {
    const { tipo, treinador } = req.body;

    if (!validTipos.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    if (!treinador || typeof treinador !== 'string' || !treinador.trim()) {
      return res.status(400).json({ error: 'Treinador é obrigatório' });
    }

    const nivel = 1;

    const [result] = await pool.query(
      'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, ?)',
      [tipo, treinador, nivel]
    );

    const id = result.insertId;

    res.status(201).json({ id, tipo, treinador, nivel });
  } catch (err) {
    console.error('Erro ao criar Pokémon:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});


// 1.2 Alterar treinador
app.put('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { treinador } = req.body;

    if (!treinador || typeof treinador !== 'string' || !treinador.trim()) {
      return res.status(400).json({ error: 'Treinador é obrigatório' });
    }

    const [result] = await pool.query(
      'UPDATE pokemons SET treinador = ? WHERE id = ?',
      [treinador, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pokemon não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Erro ao alterar treinador:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.3 Deletar pokemon
app.delete('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pokemons WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.5 Listar todos os pokemons
app.get('/pokemons/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.4 Carregar um pokemon
app.get('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM pokemons WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon não encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});





module.exports = app;

