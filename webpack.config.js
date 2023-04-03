import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LwcWebpackPlugin from 'lwc-webpack-plugin';

export default {
    entry: './src/index.js',
    output: {
        path: path.resolve('./', 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.html'],
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     // Unignore @lwc to properly load sourcemaps for @lwc/synthetic-shadow and @lwc/engine-dom
            //     exclude: /node_modules\/(?!@lwc)(.*)/, 
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },
            // {
            //     test: /\.html$/,
            //     exclude: /index\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //     },
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ],
                exclude: [ /node_modules/, /src\/modules/ ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/resources/', to: 'resources' }
            ]
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
            minify: false,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: {
                source: false
            }
        }),
        new LwcWebpackPlugin(),
    ],
    devServer: {
        liveReload: true,
        compress: true,
        port: 9000,
        open: false
    }
};