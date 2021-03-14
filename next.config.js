module.exports = {
    compress: false,
    async headers() {
        return [
          {
            source: '/_next/data/:path*',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=2628000, immutable',
              },
            ],
          },
        ]
      },
}