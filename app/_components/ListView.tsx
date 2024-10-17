import { RootProps } from '@/types/data';
import CapturedButton from './CapturedButton';
import Image from 'next/image';

const ListView: React.FC<RootProps> = ({ pokemonData, isListView }) => {
  const extractPokemonId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-1">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <ul className="min-w-full leading-normal">
              {pokemonData && pokemonData.length > 0 ? (
                pokemonData.map((item) => {
                  const pokemonId = extractPokemonId(item.url);
                  return (
                    <li
                      key={pokemonId}
                      className="flex justify-between items-center border-b border-gray-200 py-4"
                    >
                      {/* Image and Name Container */}
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center space-x-4 w-12 h-12 relative">
                          <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                            alt={item.name}
                            sizes="100%"
                            fill
                          />
                        </div>
                        <span className="text-sm">{`Name: ${item.name}`}</span>
                      </div>

                      {/* Button Container */}
                      <div>
                        <CapturedButton
                          isListView={isListView}
                          pokemonId={+pokemonId}
                        />
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>No data</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
