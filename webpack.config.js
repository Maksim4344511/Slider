const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let mode = 'development';
let isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    mode = 'production';
}

module.exports = isProd ? {
        mode: mode,
        entry: {
            scripts: './src/slider/slider.js',
        },
        output: {
            filename: 'slider.js',
            clean: true,
            library: 'libraryStarter',
            libraryTarget: 'umd',
            globalObject: 'this',
        },

        optimization: {
            splitChunks:{
                chunks: 'all',
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'slider.css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                        },
                        "sass-loader"
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    include: '/slider/',
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
    } : {
    mode: mode,
    entry: {
        scripts: './src/index.js',
        
    },
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devServer: {
         open: true, 
        static: {
            directory: './src',
            watch: true,
        }
    },
    devtool: 'source-map',
    optimization: {
        splitChunks:{
            chunks: 'all',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
      
        new HtmlWebpackPlugin({
                template: './src/index.pug',
                filename: 'index.html',
            })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                     options: {
                         presets: ['@babel/preset-env']
                     }
                }
            }
        ]
    },
}
