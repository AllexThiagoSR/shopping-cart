export const getAddress = async (cep) => {
  const address = await Promise.any([
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
  ]);
  const { city, state } = await address.json();
  console.log(`${city} - ${state}`);
};

export const searchCep = () => {
  const inputValue = document.querySelector('.cep-input').value;
  getAddress(inputValue);
};
