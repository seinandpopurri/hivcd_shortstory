import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer className="footer">
        <a 
          href="http://instagram.com/seinandpopurri" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Made by Sein Hong for the HIVCD Communication Design (1) class
        </a>
      </footer>
    </>
  );
} 