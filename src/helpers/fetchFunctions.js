export const fetchProduct = async (productId) => {
  if (!productId) throw new Error('ID não informado');
  const result = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const data = await result.json();
  return data;
};

export const fetchProductsList = async (products) => {
  if (!products) throw new Error('Termo de busca não informado');
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${products}`);
  const data = await result.json();
  return data.results;
};
