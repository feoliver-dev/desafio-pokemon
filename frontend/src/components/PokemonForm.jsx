//Criar Pokemon
import React, { useState } from 'react';
import api from '../services/api';

function PokemonForm() {
  const [tipo, setTipo] = useState('');
  const [treinador, setTreinador] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/pokemons', { tipo, treinador })
      .then(() => {
        alert('Pokémon criado!');
        setTipo('');
        setTreinador('');
      })
      .catch(err => alert(err.response.data.error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Pokémon</h2>
      <input placeholder="Tipo" value={tipo} onChange={e => setTipo(e.target.value)} />
      <input placeholder="Treinador" value={treinador} onChange={e => setTreinador(e.target.value)} />
      <button type="submit">Criar</button>
    </form>
  );
}

export default PokemonForm;

