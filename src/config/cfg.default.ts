export default {
  server: {
    port: 8888,
    enableSwagger: true,
    rateLimit: {
      windowMs: 60 * 1000, // time window
      maxRequest: 100, // limit each IP to rateLimitMax requests per windowMs
    },
    allowOrigins: [],
    helmet: {
      hsts: {
        maxAge: 31536000, // OWSAP recommend
        includeSubDomains: true,
        preload: true,
      },
      contentSecurityPolicy: {
        defaultSrc: ["'self'"],
      },
      referrerPolicy: {
        policy: 'origin',
      },
    },
  },
};
