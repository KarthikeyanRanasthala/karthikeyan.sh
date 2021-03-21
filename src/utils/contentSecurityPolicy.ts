import builder from 'content-security-policy-builder';

const commonConfig: Record<string, string[]> = {
  'default-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'none'"],
};

const getContentSecurityPolicy = (nonce: string): string => {
  if (process.env.NODE_ENV === 'production') {
    return builder({
      directives: {
        ...commonConfig,
        'style-src': [`'nonce-${nonce}'`],
        'script-src': ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"],
        'connect-src': [
          "'self'",
          'https://*.googleapis.com',
          'https://www.google-analytics.com',
        ],
      },
    });
  } else
    return builder({
      directives: {
        ...commonConfig,
        'style-src': ["'unsafe-inline'"],
        'script-src': ["'self'", "'unsafe-eval'"],
      },
    });
};

export default getContentSecurityPolicy;
