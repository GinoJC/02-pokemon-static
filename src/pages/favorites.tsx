import { useEffect, useState } from 'react';
import Layout from 'components/layouts';
import { NoFavorites } from 'components/ui';
import { NextPage } from 'next';
import { localFavorites } from 'utils';
import { Card, Grid } from '@nextui-org/react';
import FavoritePokemons from 'components/pokemon/FavoritePokemons';

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokémons - Favoritos">
      {!favoritePokemons.length ? <NoFavorites /> : <FavoritePokemons pokemons={favoritePokemons} />}
    </Layout>
  );
};

export default FavoritesPage;
