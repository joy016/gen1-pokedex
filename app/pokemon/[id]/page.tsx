'use client';

import { getSinglePokemon } from '@/api/pokemon';
import CapturedButton from '@/app/_components/CapturedButton';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const PokemonDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['pokemon', 1],
    queryFn: () => getSinglePokemon(+params.id),
  });

  const [pokemonInfo, setPokemonInfo] = useState({
    nickname: '',
    date: '',
  });

  useEffect(() => {
    if (localStorage.getItem('pokemon')) {
      const result = JSON.parse(
        localStorage.getItem('pokemon')!
      ).capturedPokemon;

      const filteredPokemon = result.filter(
        (pokemon: any) => pokemon.id === +params.id
      );

      if (filteredPokemon.length > 0) {
        const { nickname, date } = filteredPokemon[0];
        setPokemonInfo({ nickname, date });
      }
    }
  }, [params.id]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setPokemonInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (localStorage.getItem('pokemon')) {
      let capturedPokemon: Array<{
        id: number;
        nickname: string;
        date: string;
      }> = JSON.parse(localStorage.getItem('pokemon')!).capturedPokemon;

      if (capturedPokemon.some((item) => item.id === +params.id)) {
        capturedPokemon = capturedPokemon.map((p: any) => {
          if (p.id === +params.id) {
            p[name] = value;
          }

          return p;
        });

        localStorage.setItem(
          'pokemon',
          JSON.stringify({
            capturedPokemon,
          })
        );
      }
    } else {
      localStorage.setItem(
        'pokemon',
        JSON.stringify({
          capturedPokemon: [
            {
              id: +params.id,
              nickname: name === 'nickname' ? value : pokemonInfo.nickname,
              date: name === 'nickname' ? value : pokemonInfo.date,
            },
          ],
        })
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  h-[100%] md:h-screen bg-gray-200">
      <div
        onClick={() => router.back()}
        className="flex items-center justify-center mb-5 cursor-pointer"
      >
        <IoArrowBack className="w-11 h-11" />
        Go Back
      </div>

      {data ? (
        <>
          <div className="flex flex-col lg:flex-row w-[80%] md:w-[50%] bg-red-50 p-10 rounded-md shadow-2xl">
            <div>
              <div className="relative h-40 md:h-80 w-40 md:w-80">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`}
                  sizes="100%"
                  fill
                  alt="Picture of the pokemon"
                />
              </div>
              <h2 className="text-4xl font-semibold tracking-wide text-center">
                {data.name}
              </h2>
            </div>

            <div>
              <div className="w-full bg-red-500 p-10">
                <ul>
                  <li>Base Experience : {data.base_experience}</li>
                  <li>Height:{data.height}</li>
                  <li>Weight :{data.weight}</li>
                </ul>
              </div>
              <div className="border-solid border-2 border-indigo-600 flex flex-col gap-4 justify-center p-6 mt-3 rounded-md">
                <h2 className="text-xl font-semibold text-center">Status</h2>

                <label
                  htmlFor="nickname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Input Name
                </label>
                <div className="mt-2 ">
                  <input
                    type="text"
                    name="nickname"
                    value={pokemonInfo.nickname}
                    onChange={handleInputChange}
                    className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                  />
                </div>
                <label
                  htmlFor="date"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Input Date
                </label>
                <div className="mt-2 ">
                  <input
                    type="date"
                    name="date"
                    className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    value={
                      !!pokemonInfo.date
                        ? new Date(pokemonInfo.date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={handleInputChange}
                  />
                </div>

                <CapturedButton pokemonId={+params.id} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
