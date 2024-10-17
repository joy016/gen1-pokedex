import axios from 'axios';

export const getPokemon = (page: number) => {
  const offset = (page - 1) * 15;
  const response = axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=15&offset=${offset}`)
    .then((res) => res.data);
  return response;
};

export const getSinglePokemon = (id: number) => {
  const response = axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.data);

  return response;
};
