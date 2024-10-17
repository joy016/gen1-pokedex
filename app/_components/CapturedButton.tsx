'use client';

import { useEffect, useState } from 'react';

const CapturedButton = ({
  isListView,
  pokemonId,
}: {
  isListView?: boolean;
  pokemonId: number;
}) => {
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('pokemon') &&
      JSON.parse(localStorage.getItem('pokemon')!).capturedPokemon.some(
        (item: { id: number; nickname: string; date: string }) =>
          item.id === pokemonId
      )
    ) {
      setCaptured(true);
    }
  }, [pokemonId]);

  const updateLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);

    // Dispatch a custom event
    window.dispatchEvent(new Event('localStorageChanged'));
  };

  const handleCapture = () => {
    setCaptured((prev) => !prev);

    if (localStorage.getItem('pokemon')) {
      let capturedPokemon: Array<{
        id: number;
        nickname: string;
        date: string;
      }> = JSON.parse(localStorage.getItem('pokemon')!).capturedPokemon;

      if (capturedPokemon.some((item) => item.id === pokemonId)) {
        capturedPokemon = capturedPokemon.filter((p) => p.id !== pokemonId);

        updateLocalStorage(
          'pokemon',
          JSON.stringify({
            capturedPokemon,
          })
        );
      } else {
        localStorage.setItem(
          'pokemon',
          JSON.stringify({
            capturedPokemon: [
              ...capturedPokemon,
              {
                id: pokemonId,
                nickname: '',
                date: new Date(),
              },
            ],
          })
        );
      }
    } else {
      localStorage.setItem(
        'pokemon',
        JSON.stringify({
          capturedPokemon: [
            {
              id: pokemonId,
              nickname: '',
              date: new Date(),
            },
          ],
        })
      );
    }
  };
  return (
    <button
      className={`p-4 mt-2 rounded-md text-white
         text-xs font-semibold ${captured ? 'bg-indigo-300' : 'bg-indigo-500'}`}
      onClick={handleCapture}
    >
      TAG AS CAPTURE
    </button>
  );
};

export default CapturedButton;
