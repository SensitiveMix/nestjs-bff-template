export default {
  server: {
    port: 8888,
    enableSwagger: true,
    rateLimit: {
      windowMs: 60 * 1000, // time window
      maxRequest: 100, // limit each IP to rateLimitMax requests per windowMs
    },
    helmet: {
      contentSecurityPolicy: {
        frameAncestors: ["'self'", 'https://*.demo.net'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
      },
    },
  },
};
