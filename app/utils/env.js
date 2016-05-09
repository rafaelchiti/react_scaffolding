// Use singletons since this is only analyzed when the bundle is loaded, so
// no harm, which also allow us to export a literal instead of needing a func.
let isTesting, isDev, isProd;

getEnvValues();
updateSingletonEnvValues();


function getEnvValues() {
  isTesting = process && process.env.NODE_ENV === 'testing';
  isDev = process && process.env.NODE_ENV === 'development';
  isProd = process && process.env.NODE_ENV === 'production';
}

function updateSingletonEnvValues() {
  module.exports.isTest = isTesting;
  module.exports.isTesting = isTesting;
  module.exports.isDev = isDev;
  module.exports.isDevelopment = isDev;
  module.exports.isProd = isProd;
  module.exports.isProduction = isProd;
}
