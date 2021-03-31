export default {
  server: {
    enableSwagger: false,
    helmet: {
      contentSecurityPolicy: {
        frameAncestors: ["'self'", 'https://*.demo.com'],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://*.demo.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://*.demo.com'],
        imgSrc: ["'self'", 'data:', 'https://*.demo.com'],
        connectSrc: ["'self'", 'https://*.demo.com'],
      },
    },
  },
};
