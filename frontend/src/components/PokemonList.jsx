import { useEffect, useState } from 'react';
import api from './services/api';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    api.get('/pokemons')  // 🔁 Aqui você troca pela rota GET do seu backend
      .then(response => setPokemons(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista de Pokémon</h2>
      <ul>
        {pokemons.map(p => (
          <li key={p.id}>{p.nome} - Nível {p.nivel}</li>
        ))}
      </ul>
    </div>
  );
}

