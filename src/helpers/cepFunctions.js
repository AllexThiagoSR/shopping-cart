const getStreet = ({ address, street }) => {
  const verify = !street;
  return (verify ? address : street.split('-')[0]);
};

const getDistrict = ({ neighborhood, district }) => {
  const verify = !district;
  return (verify ? neighborhood : district);
};

const checkError = ({ type, status }) => type !== undefined || status !== undefined;

const runFetch = async (endpoint) => {
  const data = await (await fetch(endpoint)).json();
  if (checkError(data)) throw new Error('problema api');
  return data;
};

const fetchCep = async (cep) => {
  const address = await Promise.any([
    runFetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
    runFetch(`https://cep.awesomeapi.com.br/json/${cep}`),
  ]);
  const data = await address;
  return data;
};

export const getAddress = async (cep) => {
  const address = await fetchCep(cep);
  const { city, state } = address;
  const street = getStreet(address);
  const district = getDistrict(address);
  return `${street} - ${district} - ${city} - ${state}`;
};

export const searchCep = async () => {
  const inputValue = document.querySelector('.cep-input').value;
  document.querySelector('.cep-input').value = '';
  const addressSpan = document.querySelector('.cart__address');

  try {
    const address = await getAddress(inputValue);
    addressSpan.innerText = address;
  } catch (error) {
    console.log(error);
    addressSpan.innerText = 'CEP não encontrado';
  }
};
