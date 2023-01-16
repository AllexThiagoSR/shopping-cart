import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const productsSec = document.querySelector('.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = await fetchProductsList('computador');

productsSec.replaceChildren(...products.map(createProductElement));
