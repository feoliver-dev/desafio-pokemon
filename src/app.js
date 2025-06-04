const express = require('express');
const app = express();
const pool = require('./connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { body, param, validationResult } = require('express-validator');

app.use(express.json()); // Para ler JSON do corpo da requisição
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const validTipos = ['charizard', 'mewtwo', 'pikachu'];

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

/**
 * @swagger
 * /pokemons:
 *   post:
 *     summary: Cria um novo Pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - treinador
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: pikachu
 *               treinador:
 *                 type: string
 *                 example: Ash
 *     responses:
 *       201:
 *         description: Pokémon criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 tipo:
 *                   type: string
 *                 treinador:
 *                   type: string
 *                 nivel:
 *                   type: integer
 */


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

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     summary: Altera o treinador de um Pokémon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - treinador
 *             properties:
 *               treinador:
 *                 type: string
 *                 example: Misty
 *     responses:
 *       204:
 *         description: Treinador alterado com sucesso (sem conteúdo)
 */
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

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     summary: Deleta um Pokémon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Pokémon
 *     responses:
 *       204:
 *         description: Pokémon deletado com sucesso (sem conteúdo)
 *       404:
 *         description: Pokémon não encontrado
 */
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


/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Retorna os dados de um Pokémon específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Pokémon
 *     responses:
 *       200:
 *         description: Dados do Pokémon retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 tipo:
 *                   type: string
 *                 treinador:
 *                   type: string
 *                 nivel:
 *                   type: integer
 *       404:
 *         description: Pokémon não encontrado
 */
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

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Lista todos os Pokémons
 *     responses:
 *       200:
 *         description: Lista de Pokémons retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   treinador:
 *                     type: string
 *                   nivel:
 *                     type: integer
 */


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
