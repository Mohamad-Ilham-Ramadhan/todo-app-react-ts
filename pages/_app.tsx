import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps } : AppProps)  {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp
