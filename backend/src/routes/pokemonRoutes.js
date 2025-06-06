const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { validarPokemon, validarId, validarErros } = require('../validations/pokemonValidation');
const app = express();
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
router.post('/', validarPokemon, validarErros, pokemonController.criarPokemon);

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
router.put('/:id', validarId, validarErros, pokemonController.alterarPokemon);

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
router.delete('/:id', validarId, validarErros, pokemonController.deletarPokemon);

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
router.get('/:id', validarId, validarErros, pokemonController.carregarPokemon);

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
router.get('/', pokemonController.listarPokemons);

module.exports = router;

