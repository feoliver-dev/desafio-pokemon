// pode rodar usando npm start ou npm run dev
const express = require('express');
const router = express.Router();
const batalhaController = require('../controllers/batalhaController');
const { validarBatalha, validarErros } = require('../validations/batalhaValidation');

/**
 * @swagger
 * /batalhar/{pokemonAId}/{pokemonBId}:
 *   post:
 *     summary: Efetua uma batalha entre dois Pokémons
 *     description: |
 *       Realiza uma batalha entre dois pokémons informados por ID. 
 *       O vencedor ganha +1 nível, o perdedor perde -1 nível. 
 *       Se o nível do perdedor chegar a 0, ele é removido da base de dados.
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
 *         description: Resultado da batalha com os dados atualizados do vencedor e do perdedor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vencedor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     tipo:
 *                       type: string
 *                       example: pikachu
 *                     treinador:
 *                       type: string
 *                       example: Ash
 *                     nivel:
 *                       type: integer
 *                       example: 2
 *                 perdedor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     tipo:
 *                       type: string
 *                       example: charizard
 *                     treinador:
 *                       type: string
 *                       example: Renato
 *                     nivel:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Parâmetros inválidos
 *       404:
 *         description: Um ou ambos os pokémons não foram encontrados
 */

router.post('/:pokemonAId/:pokemonBId', validarBatalha, validarErros, batalhaController.realizarBatalha);

module.exports = router;
