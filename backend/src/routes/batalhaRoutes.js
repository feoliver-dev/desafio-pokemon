const express = require('express');
const router = express.Router();
const batalhaController = require('../controllers/batalhaController');
const { validarBatalha, validarErros } = require('../validations/batalhaValidation');

/**
 * @swagger
 * /batalhar/{pokemonAId}/{pokemonBId}:
 *   post:
 *     summary: Efetua uma batalha entre dois Pokémons
 *     parameters:
 *       - in: path
 *         name: pokemonAId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Pokémon A
 *       - in: path
 *         name: pokemonBId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Pokémon B
 *     responses:
 *       200:
 *         description: Resultado da batalha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vencedor:
 *                   type: object
 *                 perdedor:
 *                   type: object
 */
router.post('/:pokemonAId/:pokemonBId', validarBatalha, validarErros, batalhaController.realizarBatalha);

module.exports = router;
