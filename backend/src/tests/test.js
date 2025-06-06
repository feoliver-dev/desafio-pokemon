const request = require('supertest');
const app = require('../app'); // ajuste o caminho conforme o seu projeto
const pool = require('../connection');

// Função isolada para testes unitários
const validTipos = ['charizard', 'mewtwo', 'pikachu'];

function validarTipo(tipo) {
  return validTipos.includes(tipo);
}

// Exemplo de função da lógica de batalha (simplificada)
function determinarVencedor(p1, p2) {
  if (p1.nivel > p2.nivel) return p1;
  if (p2.nivel > p1.nivel) return p2;
  return Math.random() > 0.5 ? p1 : p2;
}

describe('Testando CRUD de Pokémons', () => {
  let pokemonId;

beforeAll(async () => {
    console.log('Iniciando os testes...');
  });

  it('Deve criar um Pokémon', async () => {
    const res = await request(app)
      .post('/pokemons')
      .send({ tipo: 'pikachu', treinador: 'Ash' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nivel).toBe(1);
    pokemonId = res.body.id;
  });

  it('Deve carregar o Pokémon', async () => {
    const res = await request(app).get(`/pokemons/${pokemonId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.tipo).toBe('pikachu');
  });

  it('Deve alterar o treinador do Pokémon', async () => {
    const res = await request(app)
      .put(`/pokemons/${pokemonId}`)
      .send({ treinador: 'Misty' });

    expect(res.statusCode).toBe(204);
  });

  it('Deve verificar a alteração do treinador', async () => {
    const res = await request(app).get(`/pokemons/${pokemonId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.treinador).toBe('Misty');
  });

  it('Deve listar todos os Pokémons', async () => {
    const res = await request(app).get('/pokemons');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve deletar o Pokémon', async () => {
    const res = await request(app).delete(`/pokemons/${pokemonId}`);
    expect(res.statusCode).toBe(204);
  });

  it('Não deve encontrar Pokémon deletado', async () => {
    const res = await request(app).get(`/pokemons/${pokemonId}`);
    expect(res.statusCode).toBe(404);
  });
});

describe('Testes negativos (integração)', () => {
  it('Não deve criar Pokémon com tipo inválido', async () => {
    const res = await request(app)
      .post('/pokemons')
      .send({ tipo: 'bulbasaur', treinador: 'Ash' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('Não deve alterar Pokémon inexistente', async () => {
    const res = await request(app)
      .put('/pokemons/99999')
      .send({ treinador: 'Ash' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('Não deve deletar Pokémon inexistente', async () => {
    const res = await request(app).delete('/pokemons/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('Não deve carregar Pokémon inexistente', async () => {
    const res = await request(app).get('/pokemons/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Testes unitários', () => {
  it('Deve validar tipo de Pokémon corretamente', () => {
    expect(validarTipo('pikachu')).toBe(true);
    expect(validarTipo('charizard')).toBe(true);
    expect(validarTipo('mewtwo')).toBe(true);
    expect(validarTipo('bulbasaur')).toBe(false);
  });

  it('Deve determinar vencedor baseado no nível', () => {
    const p1 = { id: 1, nivel: 2 };
    const p2 = { id: 2, nivel: 1 };
    const vencedor = determinarVencedor(p1, p2);
    expect(vencedor).toBe(p1);
  });

  it('Deve determinar vencedor aleatoriamente quando níveis iguais', () => {
    const p1 = { id: 1, nivel: 1 };
    const p2 = { id: 2, nivel: 1 };
    const vencedor = determinarVencedor(p1, p2);
    expect([p1, p2]).toContain(vencedor);
  });
});

afterAll(async () => {
  console.log('Encerrando a conexão com o banco de dados...');
  await pool.end();
});