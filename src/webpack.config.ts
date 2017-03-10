import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const BASE_CSS_LOADER = {
  loader: 'css-loader',
  options: { sourceMap: true, minimize: false }
};

export const config: webpack.Configuration = {
  devtool: 'eval-source-map',
  // context: path.resolve(path.join(__dirname, 'app')),
  entry: {
    middleware: 'webpack-hot-middleware/client?reload=true',
    app: './src/app/main.tsx',
    vendor: ['react', 'react-dom', 'react-router']
  },
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx', '.json'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: 'src/app/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor-[hash].min.js',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [],
        use: [
          'style-loader',
          BASE_CSS_LOADER,
          // 'postcss-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true, includePaths: [path.resolve(__dirname + '/app/styles')] }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [],
        use: [
          'style-loader',
          BASE_CSS_LOADER,
          // 'postcss-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['latest', 'react', 'es2015', { modules: false }] }
        }],
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'ts-loader'
        }],
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'html-loader'
        }],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]---[local]---[hash:base64:5]'
            }
          },
        ],
      },
      {
        test: /\.woff(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]',
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.woff2(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]',
              limit: 10000,
              mimetype: 'application/font-woff2'
            }
          }
        ]
      },
      {
        test: /\.otf(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'file-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]',
              limit: 10000,
              mimetype: 'font/opentype'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]',
              limit: 10000,
              mimetype: 'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'file-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              name: '[path][name].[ext]',
              limit: 10000,
              mimetype: 'image/svg+xml'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};