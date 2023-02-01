import { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';
import Layout from 'components/layouts';
import { PokemonListResponse, SmallPokemon } from 'interfaces';
import { pokeApi } from 'api';
import PokemonCard from 'components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon, idx) => (
          <PokemonCard pokemon={pokemon} key={idx} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, idx) => ({
    ...poke,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
