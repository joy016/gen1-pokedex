'use client';

import { RootProps } from '@/types/data';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CapturedButton from './CapturedButton';
import { extractPokemonId } from '@/utils/helper';

const GridView: React.FC<RootProps> = ({ pokemonData, isListView }) => {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
      {pokemonData && pokemonData.length > 0 ? (
        pokemonData.map((item) => {
          const pokemonId = extractPokemonId(item.url);
          return (
            <div key={item.name} className="flex flex-col gap-1">
              <div className="w-full rounded-md ring-2 ring-red-500 relative">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  width={500}
                  height={500}
                  alt={`Picture of ${item.name}`}
                  className="relative w-full h-80"
                  onClick={() => router.push(`/pokemon/${pokemonId}`)}
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-sm tracking-wide font-semibold text-gray-500 mt-2">
                    #{pokemonId.padStart(4, '0')}
                  </span>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                </div>

                <CapturedButton
                  isListView={isListView}
                  pokemonId={+pokemonId}
                />
              </div>
            </div>
          );
        })
      ) : (
        <p>No Pokémon data available.</p>
      )}
    </div>
  );
};

export default GridView;
