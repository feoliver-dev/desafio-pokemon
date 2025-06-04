const request = require('supertest');
const app = require('./app');

let pokemonId; 


describe('Testando CRUD de Pokemons', () => {

  it('Deve criar um pokemon', async () => {
    const res = await request(app)
      .post('/pokemons')
      .send({
        tipo: 'pikachu',
        treinador: 'Ash'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.tipo).toBe('pikachu');
    expect(res.body.nivel).toBe(1);

    pokemonId = res.body.id;  // ✅ salva o id para os próximos testes
  });

  it('Deve carregar o pokemon', async () => {
    const res = await request(app)
      .get(`/pokemons/${pokemonId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.treinador).toBe('Ash');  // ✅ conferindo o treinador original
    expect(res.body.tipo).toBe('pikachu');
  });

  it('Deve alterar o treinador do pokemon', async () => {
    const res = await request(app)
      .put(`/pokemons/${pokemonId}`)
      .send({
        treinador: 'Misty'
      });

    expect(res.statusCode).toBe(204);
  });

  it('Deve verificar o pokemon com treinador alterado', async () => {
    const res = await request(app)
      .get(`/pokemons/${pokemonId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.treinador).toBe('Misty');  // ✅ conferindo alteração
  });

  it('Deve deletar o pokemon', async () => {
    const res = await request(app)
      .delete(`/pokemons/${pokemonId}`);

    expect(res.statusCode).toBe(204);
  });

  it('Não deve encontrar o pokemon deletado', async () => {
    const res = await request(app)
      .get(`/pokemons/${pokemonId}`);

    expect(res.statusCode).toBe(404);
  });

});
