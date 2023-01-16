export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (product) => {
  if (!product) throw new Error('Termo de busca não informado');
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await result.json();
  return data.results;
};
