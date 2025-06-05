import { useEffect, useState } from 'react';
import api from '../services/api';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  const carregar = async () => {
    try {
      const res = await api.get('/pokemons');
      setPokemons(res.data);
    } catch (err) {
      console.error('Erro ao carregar Pokémons', err);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Lista de Pokémons</h2>
      <ul>
        {pokemons.map(p => (
          <li key={p.id}>
            {p.tipo} - {p.treinador} (Nível: {p.nivel})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
