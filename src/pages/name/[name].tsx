import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getPokemonInfo } from 'utils';
import { Pokemon, PokemonListResponse } from 'interfaces';
import { pokeApi } from 'api';
import PokemonInfo from 'components/pokemon/PokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return <PokemonInfo pokemon={pokemon} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const paths = data.results.map((poke) => ({ params: { name: poke.name } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
