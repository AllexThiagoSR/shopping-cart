import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(fetchProductsList).toBeInstanceOf(Function);
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('fetchProductsList com o argumento \'computador\' é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    await expect(fetchProductsList('computador')).resolves.toEqual(computadorSearch);
  });

  it('fetchProductsList sem argumento, retorna um erro com a mensagem: \'Termo de busca não informado\'', async () => {
    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });

  // it('...', () => {
  // });
});
