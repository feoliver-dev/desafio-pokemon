const connection = require('../connection');

// CREATE
exports.create = async (req, res) => {
  const { tipo, treinador, nivel } = req.body;
  try {
    const [result] = await connection.execute(
      'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, ?)',
      [tipo, treinador, nivel]
    );
    res.status(201).json({ id: result.insertId, tipo, treinador, nivel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.read = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM pokemons WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Pokemon não encontrado' });
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  const { id } = req.params;
  const { tipo, treinador, nivel } = req.body;
  try {
    const [result] = await connection.execute(
      'UPDATE pokemons SET tipo = ?, treinador = ?, nivel = ? WHERE id = ?',
      [tipo, treinador, nivel, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pokemon não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.execute(
      'DELETE FROM pokemons WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pokemon não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


