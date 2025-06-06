CREATE DATABASE IF NOT EXISTS pokemon_db;
USE pokemon_db;

CREATE TABLE IF NOT EXISTS pokemons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50),
  treinador VARCHAR(50),
  nivel INT
);
