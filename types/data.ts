export interface RootProps {
  pokemonData: PokemonProps[];
  isListView: boolean;
  handleCapture?: (data: any) => void;
}

export interface PokemonProps {
  name: string;
  url: string;
}

export interface CapturedProps {
  name: string;
  url: string;
  isCapture: boolean;
}
