const { body, param, validationResult } = require('express-validator');

const validTipos = ['charizard', 'mewtwo', 'pikachu'];

exports.validarPokemon = [
  body('tipo')
    .isString().withMessage('Tipo deve ser uma string')
    .isIn(validTipos).withMessage('Tipo inválido'),
  body('treinador')
    .isString().withMessage('Treinador deve ser uma string')
    .notEmpty().withMessage('Treinador é obrigatório')
];

exports.validarId = [
  param('id')
    .isInt().withMessage('ID deve ser um número inteiro')
];

exports.validarErros = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array().map(e => e.msg).join(', '));
    error.status = 400;
    return next(error);
  }
  next();
};