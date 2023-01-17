const getStreet = ({ address, street }) => {
  const verify = !street;
  return (verify ? address : street.split('-')[0]);
};

const getDistrict = ({ neighborhood, district }) => {
  const verify = !district;
  return (verify ? neighborhood : district);
};

const checkError = ({ type, status }) => type !== undefined || status !== undefined;

const fetchCep = async (cep) => {
  const address = await Promise.any([
    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
  ]);
  const data = await address.json();
  if (checkError(data)) throw new Error('CEP não encontrado');
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
    addressSpan.innerText = error.message;
  }
};
