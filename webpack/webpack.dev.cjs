const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.cjs');
const ip = require('internal-ip');
const portFinderSync = require('portfinder-sync');

const d = (folder) => path.resolve(__dirname, folder);

module.exports = merge(commonConfiguration, {
  mode: 'development',
  entry: ['react-hot-loader/patch', d('../src/index.tsx')],
  devServer: {
    host: '0.0.0.0',
    port: portFinderSync.getPort(8080),
    contentBase: d('../dist'),
    watchContentBase: true,
    open: true,
    https: false,
    useLocalIp: true,
    disableHostCheck: true,
    overlay: true,
    noInfo: true,
    after: function (app, server, compiler) {
      const port = server.options.port;
      const https = server.options.https ? 's' : '';
      const localIp = ip.v4.sync();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;
      console.log(`Project running at:\n  - ${domain1}\n  - ${domain2}`);
    },
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
