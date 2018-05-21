const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  return {
    devtool: devMode ? 'inline-source-map' : 'none',
    entry: {
      vendor: [
        require.resolve('jquery'),
        require.resolve('popper.js'),
        require.resolve('bootstrap'),
        'bootstrap/dist/css/bootstrap.min.css',
      ],
      app: [
        './src/js/app.js',
        './src/scss/main.scss',
      ],
    },
    output: {
      filename: './js/[name].js',
    },
    module: {
      rules: [
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery',
          }, {
            loader: 'expose-loader',
            options: '$',
          }],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env'],
            },
          },
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            devMode ? 'css-loader' : { loader: 'css-loader', options: { minimize: true } },
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: devMode ? ['html-loader'] : [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash].[ext]',
                context: '',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                mozjpeg: {
                  progressive: false,
                  quality: 65,
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
      }),
    ],
  };
};
