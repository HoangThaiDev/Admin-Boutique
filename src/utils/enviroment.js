const env = {
  URL_SERVER_DEV: import.meta.env.VITE_URL_SERVER_LOCAL,
  URL_SERVER_PRODUCTION: import.meta.env.VITE_URL_SERVER_PRODUCTION,
  BUILD_MODE: import.meta.env.MODE,
};

export default env;
