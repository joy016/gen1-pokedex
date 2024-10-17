export const extractPokemonId = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
