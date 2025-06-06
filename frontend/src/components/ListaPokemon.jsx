import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ListaPokemon() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    api.get('/pokemons')
      .then(response => setPokemons(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Pokémons</h2>
      <ul>
        {pokemons.map(p => (
          <li key={p.id}>
            {p.tipo} - {p.treinador} - Nível: {p.nivel}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPokemon;
