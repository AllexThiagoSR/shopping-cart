const getStreet = ({ address, street }) => {
  const verify = !street;
  return (verify ? address : street.split('-')[0]);
};

const getDistrict = ({ neighborhood, district }) => {
  const verify = !district;
  return (verify ? neighborhood : district);
};

const checkCepError = ({ type, status }) => type !== undefined || status !== undefined;

const runFetch = async (endpoint) => {
  const data = await (await fetch(endpoint)).json();
  if (checkCepError(data)) throw new Error('End point inválido');
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

export const addAddressOnPage = async () => {
  const inputValue = document.querySelector('.cep-input').value;
  document.querySelector('.cep-input').value = '';
  const addressSpan = document.querySelector('.cart__address');

  try {
    const address = await getAddress(inputValue);
    addressSpan.innerText = address;
  } catch {
    addressSpan.innerText = 'CEP não encontrado';
  }
};
