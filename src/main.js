import { addAddressOnPage } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import {
  createProductElement,
  addLoadingMessage,
  addErrorMessage,
  getLocalStorageProducts } from './helpers/shopFunctions';
import './style.css';

try {
  const productsSection = document.querySelector('.products');

  document.querySelector('.cep-button').addEventListener('click', addAddressOnPage);

  addLoadingMessage();

  const productsList = await fetchProductsList('computador');

  productsSection.replaceChildren(...productsList.map(createProductElement));

  getLocalStorageProducts();
} catch {
  addErrorMessage();
}
