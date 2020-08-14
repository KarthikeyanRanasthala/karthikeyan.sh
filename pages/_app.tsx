import { AppProps } from 'next/app';

import 'src/styles/index.css';

import NavBar from 'src/components/common/NavBar';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx>
        {`
          header {
            opacity: 0.9;
          }
        `}
      </style>
      <header className="sticky top-0 max-w-screen-xl m-auto px-4">
        <NavBar />
      </header>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
