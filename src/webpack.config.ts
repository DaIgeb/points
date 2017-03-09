import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

export const config: webpack.Configuration = {
  devtool: 'eval-source-map',
  context: path.resolve(path.join(__dirname, 'app')),
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './main.tsx'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: 'index.html'
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
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ["react", 'es2015'] }
        }],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'ts-loader',
          options: { presets: ["react", 'es2015'] }
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
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]---[local]---[hash:base64:5]'
            }
          },
        ],
      }
    ]
  }
};