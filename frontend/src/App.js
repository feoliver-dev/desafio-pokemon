// Integra os componentes
import React from 'react';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import BatalhaForm from './components/BatalhaForm';

function App() {
  return (
    <div className="App">
      <h1>Desafio Pokémon</h1>
      <PokemonForm />
      <BatalhaForm />
      <PokemonList />
    </div>
  );
}

export default App;
