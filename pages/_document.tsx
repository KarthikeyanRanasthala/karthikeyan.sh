import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
} from 'next/document';

import CustomHead from 'src/components/common/CustomHead';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const resolvedTailwindConfig = resolveConfig(tailwindConfig);

class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <CustomHead>
          <meta
            name="theme-color"
            content={resolvedTailwindConfig.theme.colors.primary.dark}
          />
        </CustomHead>
        <body className="bg-primary-dark text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
