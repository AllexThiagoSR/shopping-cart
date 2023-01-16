import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(fetchProduct).toBeInstanceOf(Function);
  });

  it('fetchProduct com o argumento do produto "MLB1405519561" e teste se fetch foi chamada', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetchProduct com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561"', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('fetchProduct com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561"', async () => {
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  });

  it('fetchProduct sem argumento, retorna um erro com a mensagem: \'ID não informado\'', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
