import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, addLoading, addErro } from './helpers/shopFunctions';
import './style.css';

try {
  const productsSec = document.querySelector('.products');

  document.querySelector('.cep-button').addEventListener('click', searchCep);

  addLoading();

  const products = await fetchProductsList('computador');
  console.log(await fetchProduct('MLB1405519561'));

  productsSec.replaceChildren(...products.map(createProductElement));
} catch (error) {
  addErro();
}
