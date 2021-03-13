import { nanoid } from 'nanoid';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Html,
  Main,
  NextScript,
} from 'next/document';
import CustomHead from 'src/components/common/CustomHead';
import flush from 'styled-jsx/server';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const resolvedTailwindConfig = resolveConfig(tailwindConfig);

class CustomDocument extends Document<DocumentProps & { nonce: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { nonce: string }> {
    const nonce = nanoid();

    const { html, head } = await ctx.renderPage();
    const styles = [...flush({ nonce })];

    let contentSecurityPolicy = '';
    if (process.env.NODE_ENV === 'production') {
      contentSecurityPolicy = `default-src 'self'; style-src 'nonce-${nonce}'; object-src 'none'; base-uri 'none';`;
    } else {
      contentSecurityPolicy = `default-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'unsafe-eval';`;
    }

    ctx.res?.setHeader('Content-Security-Policy', contentSecurityPolicy);

    return { styles, html, head, nonce };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <CustomHead nonce={this.props.nonce}>
          <meta
            name="theme-color"
            content={resolvedTailwindConfig.theme.colors.primary.dark}
          />
          <meta property="csp-nonce" content={this.props.nonce} />
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
