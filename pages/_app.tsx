import { AppProps } from 'next/app';

import 'src/styles/index.css';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default CustomApp;
