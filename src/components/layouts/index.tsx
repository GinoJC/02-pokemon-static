import Navbar from 'components/ui/Navbar';
import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

const Layout: FC<PropsWithChildren & Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Gino Carignano" />
        <meta name="description" content="Información sobre el pokémon XXXXX" />
        <meta name="keywords" content={`${title}, XXXXX, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main style={{ padding: '0 20px' }}>{children}</main>
    </>
  );
};

export default Layout;
