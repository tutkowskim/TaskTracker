const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/.auth/**', { target:'http://localhost:3030/' }));
  app.use(proxy.createProxyMiddleware('/api/*', { target:'http://localhost:3030/' }));
}