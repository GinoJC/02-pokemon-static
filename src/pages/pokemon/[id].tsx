import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getPokemonInfo } from 'utils';
import { Pokemon } from 'interfaces';
import PokemonInfo from 'components/pokemon/PokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return <PokemonInfo pokemon={pokemon} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  const pokemons = [...Array(151)].map((value, idx) => `${idx + 1}`);

  return {
    paths: pokemons.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;
