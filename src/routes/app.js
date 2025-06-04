const express = require('express');
const app = express();

app.use(express.json());

const pokemonRoutes = require('./routes/pokemons');
app.use('/pokemons', pokemonRoutes);

app.listen(3006, () => console.log('Servidor rodando'));

