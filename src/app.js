const express = require('express');
const app = express();
const pool = require('./connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 

app.use(express.json()); // Para ler JSON do corpo da requisição
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const validTipos = ['charizard', 'mewtwo', 'pikachu'];

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


app.post('/pokemons', async (req, res) => {
  try {
    const { tipo, treinador } = req.body;

    if (!validTipos.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    if (!treinador || typeof treinador !== 'string' || !treinador.trim()) {
      return res.status(400).json({ error: 'Treinador é obrigatório' });
    }
    const nivel = 1; // Utilização de await

    const [result] = await pool.query(
      'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, ?)',
      [tipo, treinador, nivel]
    );

    const id = result.insertId;

    res.status(201).json({ id, tipo, treinador, nivel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
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


app.delete('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM pokemons WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pokemon não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
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


app.get('/pokemons', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = app;