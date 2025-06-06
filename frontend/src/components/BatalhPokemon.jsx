import React, { useState } from 'react';
import api from '../services/api';

function BatalhaPokemon() {
  const [idA, setIdA] = useState('');
  const [idB, setIdB] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleBatalha = e => {
    e.preventDefault();
    api.post(`/batalhar/${idA}/${idB}`)
      .then(response => setResultado(response.data))
      .catch(err => alert(err.response.data.error));
  };

  return (
    <div>
      <h2>Batalha</h2>
      <form onSubmit={handleBatalha}>
        <input placeholder="ID Pokémon A" value={idA} onChange={e => setIdA(e.target.value)} />
        <input placeholder="ID Pokémon B" value={idB} onChange={e => setIdB(e.target.value)} />
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
