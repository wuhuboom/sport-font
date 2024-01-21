const TransformPages = require("uni-read-pages");
const path = require("path");

const { webpack } = new TransformPages();

const resolve = (dir) => path.join(__dirname, dir);
const Timestamp = new Date().getTime();
module.exports = {
  filenameHashing: true,

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ["path", "name", "aliasPath"],
          });
          return JSON.stringify(tfPages.routes);
        }, true),
      }),
    ],
    output: {
      filename: `./static/js/[name].${Timestamp}.js?v=${Timestamp}`,
      chunkFilename: `./static/js/[name].${Timestamp}.js?v=${Timestamp}`,
    },
  },
  transpileDependencies: ["@dcloudio/uni-ui"],
  devServer: {
    open: true,
  },
};
