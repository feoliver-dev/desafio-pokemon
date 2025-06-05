const pool = require('../connection');

exports.criarPokemon = async (req, res, next) => {
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
};

exports.alterarPokemon = async (req, res, next) => {
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
};

exports.deletarPokemon = async (req, res, next) => {
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
};

exports.carregarPokemon = async (req, res, next) => {
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
};

exports.listarPokemons = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};