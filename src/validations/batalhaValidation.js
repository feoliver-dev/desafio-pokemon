const { param, validationResult } = require('express-validator');

exports.validarBatalha = [
  param('pokemonAId')
    .isInt().withMessage('ID do Pokémon A deve ser um número inteiro'),

  param('pokemonBId')
    .isInt().withMessage('ID do Pokémon B deve ser um número inteiro')
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
