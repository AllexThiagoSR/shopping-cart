import { removeCartID, saveCartID, getSavedCartIDs } from './cartFunctions';
import { fetchProduct } from './fetchFunctions';

// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função que remove o produto do carrinho.
 * @param {Element} li - Elemento do produto a ser removido do carrinho.
 * @param {string} id - ID do produto a ser removido do carrinho.
 */
const removeCartProduct = (li, id) => {
  li.remove();
  removeCartID(id);
};

const getPricesOfCartProducts = () => Array
  .from(document.querySelectorAll('.cart__products .product__price__value'));

const sumCartProductsPrices = (productPrices) => {
  const total = document.querySelector('span.total-price');
  total.innerText = productPrices
    .reduce((acc, { innerText }) => (parseFloat(acc) + parseFloat(innerText))
      .toFixed(2), 0);
};

/**
 * Função responsável por criar e retornar um product do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @param {string} product.pictures - Imagens do produto.
 * @returns {Element} Elemento de um product do carrinho.
 */
export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => {
    removeCartProduct(li, id);
    sumCartProductsPrices(getPricesOfCartProducts());
  });
  return li;
};

export const addProductToCart = async (id) => {
  const cart = document.querySelector('.cart__products');
  const product = await fetchProduct(id);
  cart.appendChild(createCartProductElement(product));
  sumCartProductsPrices(getPricesOfCartProducts());
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @param {number} product.price - Preço do produto.
 * @returns {Element} Elemento de produto.
 */
export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );

  cartButton.addEventListener('click', ({ target }) => {
    const productId = getIdFromProduct(target.parentElement);
    saveCartID(productId);
    addProductToCart(productId);
  });
  section.appendChild(cartButton);

  return section;
};

export const addLoadingMessage = () => document
  .querySelector('.products')
  .appendChild(createCustomElement('div', 'loading', 'carregando...'));

export const addErrorMessage = () => document
  .querySelector('.products')
  .replaceChildren(createCustomElement(
    'div',
    'error',
    'Algum erro ocorreu, recarregue a página e tente novamente',
  ));

const fetchProductsOnCart = (ids) => ids.map(fetchProduct);

export const getLocalStorageProducts = async () => {
  if (!localStorage.cartProducts) localStorage.cartProducts = '[]';
  const productsFetched = fetchProductsOnCart(getSavedCartIDs());
  const cartProducts = await Promise.all(productsFetched);
  document.querySelector('ol.cart__products').replaceChildren(...cartProducts
    .map(createCartProductElement));
  sumCartProductsPrices(getPricesOfCartProducts());
};
