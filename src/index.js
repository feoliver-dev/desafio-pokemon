const express = require('express');
const app = express();
const pool = require('./connection');

app.use(express.json()); // Para ler JSON do corpo da requisição

const validTipos = ['charizard', 'mewtwo', 'pikachu'];

// 1.1 Criar Pokemon
app.post('/pokemons', async (req, res) => {
  try {
    const { tipo, treinador } = req.body;
    if (!validTipos.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }
    const nivel = 1;
    const [result] = await pool.query(
      'INSERT INTO pokemons (tipo, treinador, nivel) VALUES (?, ?, ?)',
      [tipo, treinador, nivel]
    );

    const id = result.insertId;
    res.status(200).json({ id, tipo, treinador, nivel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.2 Alterar treinador
app.put('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { treinador } = req.body;

    await pool.query(
      'UPDATE pokemons SET treinador = ? WHERE id = ?',
      [treinador, id]
    );

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.3 Deletar pokemon
app.delete('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pokemons WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// 1.4 Carregar um pokemon
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

// 1.5 Listar todos os pokemons
app.get('/pokemons', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemons');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
