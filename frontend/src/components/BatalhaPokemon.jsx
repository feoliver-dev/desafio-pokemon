import React, { useState } from 'react';
import api from '../services/api';

function BatalhaPokemon() {
  const [pokemonAId, setpokemonAId] = useState('');
  const [pokemonBId, setpokemonBId] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleBatalha = e => {
    e.preventDefault();
    api.post(`/batalhar/${pokemonAId}/${pokemonBId}`)
      .then(response => setResultado(response.data))
      .catch(err => alert(err.response.data.error));
  };

  return (
    <div>
      <h2>Batalha</h2>
      <form onSubmit={handleBatalha}>
        <input placeholder="ID Pokémon A" value={pokemonAId} onChange={e => setpokemonAId(e.target.value)} />
        <input placeholder="ID Pokémon B" value={pokemonBId} onChange={e => setpokemonBId(e.target.value)} />
        <button type="submit">Batalhar</button>
      </form>
      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>Vencedor: {resultado.vencedor.tipo} (Nível {resultado.vencedor.nivel})</p>
          <p>Perdedor: {resultado.perdedor.tipo} (Nível {resultado.perdedor.nivel})</p>
        </div>
      )}
    </div>
  );
}

export default BatalhaPokemon;
