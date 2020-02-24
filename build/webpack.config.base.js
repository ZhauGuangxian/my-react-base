/*
 * @Author: your name
 * @Date: 2019-12-05 14:27:49
 * @LastEditTime: 2020-02-21 18:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-service-front\build\webpack.config.base.js
 */
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('../config');
const utils = require('./util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * @param dir
 */
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
// process.env.NODE_ENV === 'development' ? 'css-hot-loader' : ''
const styleRules = [
    {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
            process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : {
                      loader: MiniCssExtractPlugin.loader
                  },
            'css-loader',
            'postcss-loader'
        ]
    },
    {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
            process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          publicPath: '../../'
                      }
                  },
            'css-loader',
            {
                loader: 'postcss-loader',
                options: { sourceMap: true }
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true,
                    modifyVars: {
                        'primary-color': '#1084FF',
                        'link-color': '#1084FF',
                        'border-radius-base': '4px',
                        'success-color': '#23AA5D',
                        'error-color': '#D0021B',
                        'warning-color': '#F86800',
                        'input-height-base': '36px',
                        'btn-height-base': '36px'
                        // or
                        //hack: 'true; @import "your-less-file-path.less";' // Override with less file
                    },
                    javascriptEnabled: true
                }
            }
        ]
    },
    {
        test: /\.module\.css$/,
        use: [
            process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : {
                      loader: MiniCssExtractPlugin.loader
                  },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: {
                        mode: 'local',
                        localIdentName: '[folder]--[local]--[hash:base64:7]'
                    }
                }
            },
            {
                loader: 'postcss-loader',
                options: { sourceMap: true }
            }
        ]
    },
    {
        test: /\.module\.less$/,
        exclude: /node_modules/,
        use: [
            process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          publicPath: '../../'
                      }
                  },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: {
                        mode: 'local',
                        localIdentName: '[folder]--[local]--[hash:base64:7]'
                    }
                }
            },
            {
                loader: 'postcss-loader',
                options: { sourceMap: true }
            },
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true,
                    javascriptEnabled: true
                }
            }
        ]
    }
];
if (process.env.NODE_ENV === 'development') {
    styleRules.forEach((item) => {
        item.use.unshift('css-hot-loader');
    });
}
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    module: {
        rules: styleRules.concat([
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(|ts|tsx)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {

                          transpileOnly: true
                        }
                      }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('src/icons')],
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ])
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'my-react-config',
            filename: 'index.html',

            template: resolve('index.html')
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[hash]-[name].css')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json','.tsx', 'ts'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    optimization: {
        minimize: process.env.NODE_ENV === 'production' ? true : false, // 开发环境不压缩
        splitChunks: {
            chunks: 'all', // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 30000, // 模块超过30k自动被抽离成公共模块
            minChunks: 1, // 模块被引用>=1次，便分割
            maxAsyncRequests: 5, // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
            automaticNameDelimiter: '~', // 命名分隔符
            cacheGroups: {
                // 缓存组，会继承和覆盖splitChunks的配置
                default: {
                    // 模块缓存规则，设置为false，默认缓存组将禁用
                    minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                    priority: -20, // 优先级
                    reuseExistingChunk: true // 默认使用已有的模块
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                    priority: -10
                },
                echarts: {
                    name: 'chunk-echarts', // 单独将 elementUI 拆包
                    priority: 15, // 权重需大于其它缓存组
                    test: /[\\/]node_modules[\\/]echarts[\\/]/
                },
                antd: {
                    name: 'chunk-antd',
                    priority: 15, // 权重需大于其它缓存组
                    test: /[\\/]node_modules[\\/]antd[\\/]/
                },
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    priority: 10,
                    test: /\.js$|\.jsx$/
                }
            }
        }
    }
};
