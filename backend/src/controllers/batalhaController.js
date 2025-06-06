const pool = require('../connection');

function determinarVencedor(pokeA, pokeB) {
  const totalNivel = pokeA.nivel + pokeB.nivel;
  const chanceA = pokeA.nivel / totalNivel;
  return Math.random() < chanceA ? pokeA : pokeB;
}

module.exports.batalharController = async (req, res, next) => {
  try {
    const { pokemonAId, pokemonBId } = req.params;

    const [rowsA] = await pool.query('SELECT * FROM pokemons WHERE id = ?', [pokemonAId]);
    const [rowsB] = await pool.query('SELECT * FROM pokemons WHERE id = ?', [pokemonBId]);

    if (rowsA.length === 0 || rowsB.length === 0) {
      const error = new Error('Um ou ambos os pokémons não foram encontrados');
      error.status = 404;
      throw error;
    }

    const pokeA = rowsA[0];
    const pokeB = rowsB[0];

    const vencedor = determinarVencedor(pokeA, pokeB);
    const perdedor = vencedor.id === pokeA.id ? pokeB : pokeA;

    // Atualiza o vencedor (+1 nível)
    const novoNivelVencedor = vencedor.nivel + 1;
    await pool.query('UPDATE pokemons SET nivel = ? WHERE id = ?', [novoNivelVencedor, vencedor.id]);
    vencedor.nivel = novoNivelVencedor;

    // Atualiza ou remove o perdedor
    const novoNivelPerdedor = perdedor.nivel - 1;

    if (novoNivelPerdedor <= 0) {
      await pool.query('DELETE FROM pokemons WHERE id = ?', [perdedor.id]);
      perdedor.nivel = 0;  // para mostrar na resposta
    } else {
      await pool.query('UPDATE pokemons SET nivel = ? WHERE id = ?', [novoNivelPerdedor, perdedor.id]);
      perdedor.nivel = novoNivelPerdedor;
    }

    res.status(200).json({
      vencedor,
      perdedor
    });

  } catch (err) {
    next(err);
  }
};
