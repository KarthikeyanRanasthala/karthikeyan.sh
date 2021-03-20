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

import flush from 'styled-jsx/server';
import { nanoid } from 'nanoid';

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
      contentSecurityPolicy = `default-src 'self'; style-src 'nonce-${nonce}'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'none';`;
    } else {
      contentSecurityPolicy = `default-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'unsafe-eval';`;
    }

    ctx.res?.setHeader('Content-Security-Policy', contentSecurityPolicy);
    ctx.res?.setHeader('X-Content-Type-Options', 'nosniff');
    ctx.res?.setHeader('X-Frame-Options', 'DENY');

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
          <NextScript nonce={this.props.nonce} />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
