'use client';

import { useEffect, useState } from 'react';
import Footer from './_components/Footer';
import GridView from './_components/GridView';
import Header from './_components/Header';
import ListView from './_components/ListView';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getPokemon } from '@/api/pokemon';
import Loading from './_components/Loading';
import { FaBackward } from 'react-icons/fa';
import { FaForward } from 'react-icons/fa6';

export default function Home() {
  const queryClient = useQueryClient();
  const [isListView, setIsListView] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [capturedData, setCapturedData] = useState({
    name: '',
    url: '',
    isCaptured: false,
  });

  const { status, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['pokemon', page],
    queryFn: () => getPokemon(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (filterBy === 'captured') {
      setResult(
        data?.results.filter((item: any) =>
          JSON.parse(localStorage.getItem('pokemon')!).capturedPokemon.some(
            (cp: { id: number; nickname: string; date: string }) =>
              cp.id === +extractPokemonId(item.url)
          )
        )
      );
    } else {
      setResult(data?.results);
    }
  }, [filterBy, isFetching]);

  useEffect(() => {
    if (!isPlaceholderData && data) {
      queryClient.prefetchQuery({
        queryKey: ['pokemon', page + 1],
        queryFn: () => getPokemon(page),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  useEffect(() => {
    const handleLocalStorageChange = () => {
      const capturedValue = localStorage.getItem('pokemon');

      setResult((prevValue) =>
        prevValue.filter((item: any) =>
          JSON.parse(capturedValue!).capturedPokemon.some(
            (cp: { id: number; nickname: string; date: string }) =>
              cp.id === +extractPokemonId(item.url)
          )
        )
      );
    };

    // Listen for the custom event
    window.addEventListener('localStorageChanged', handleLocalStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener(
        'localStorageChanged',
        handleLocalStorageChange
      );
    };
  }, []);

  const handleChange = () => {
    setIsListView((prev) => !prev);
  };

  const extractPokemonId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const handleFilter = (filteredBy: string) => {
    setFilterBy(filteredBy);
  };

  const handleSearch = (data: any) => {
    setSearchInput(data);
    console.log('inputVal', searchInput);
  };

  return (
    <div>
      <Header
        listView={isListView}
        handleChange={handleChange}
        headerName={filterBy === 'all' ? 'Pokedex' : 'Captured'}
        handleSearch={handleSearch}
      />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 mb-20">
        {isFetching ? (
          <Loading loadingMessage="Fetching Pokemon" />
        ) : (
          <>
            {capturedData.isCaptured ? (
              <p>captured</p>
            ) : isListView ? (
              <ListView pokemonData={result} isListView={isListView} />
            ) : (
              <GridView pokemonData={result} isListView={isListView} />
            )}
          </>
        )}

        {/* <button className="p-4 bg-red-700 text-white rounded-md">
          Load more
        </button> */}
      </div>
      <div className="flex justify-around">
        <button
          className="p-4"
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 1 || isFetching}
        >
          <FaBackward />
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData && data.next) {
              setPage((old) => old + 1);
            }
          }}
          disabled={!data?.next || isFetching}
        >
          <FaForward />
        </button>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-40 mb-10">
        <Footer handleFilter={handleFilter} />
      </div>
    </div>
  );
}
