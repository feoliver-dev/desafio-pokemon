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

// Middleware de validação de erros
function validarErros(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array().map(e => e.msg).join(', '));
    error.status = 400;
    return next(error);
  }
  next();
}

// Middleware de erro genérico
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Erro interno no servidor';
  res.status(status).json({ error: message });
}

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
app.post('/pokemons', validarPokemon, validarErros, async (req, res, next) => {
  try {
    const { tipo, treinador } = req.body;
    const nivel = 1;

    const [result] = await pool.query(
      'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, ?)',
      [tipo, treinador, nivel]
    );

    const id = result.insertId;
    res.status(201).json({ id, tipo, treinador, nivel });
  } catch (err) {
    next(err);
  }
});

// 1.2 Alterar treinador
app.put('/pokemons/:id', validarId, validarErros, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { treinador } = req.body;

    if (!treinador || typeof treinador !== 'string' || !treinador.trim()) {
      const error = new Error('Treinador é obrigatório');
      error.status = 400;
      throw error;
    }

    const [result] = await pool.query(
      'UPDATE pokemons SET treinador = ? WHERE id = ?',
      [treinador, id]
    );

    if (result.affectedRows === 0) {
      const error = new Error('Pokemon não encontrado');
      error.status = 404;
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 1.3 Deletar pokemon
app.delete('/pokemons/:id', validarId, validarErros, async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM pokemons WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      const error = new Error('Pokemon não encontrado');
      error.status = 404;
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 1.4 Carregar um pokemon
app.get('/pokemons/:id', validarId, validarErros, async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT * FROM pokemons WHERE id = ?', [id]);

    if (rows.length === 0) {
      const error = new Error('Pokemon não encontrado');
      error.status = 404;
      throw error;
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// 1.5 Listar todos os pokemons
app.get('/pokemons', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// Middleware de erro genérico
app.use(errorHandler);

module.exports = app;

