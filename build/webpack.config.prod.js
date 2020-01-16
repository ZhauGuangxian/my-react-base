/*
 * @Author: your name
 * @Date: 2019-12-05 14:27:49
 * @LastEditTime: 2019-12-11 14:02:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-service-front\build\webpack.config.prod.js
 */
'use strict';
const path = require('path');
const utils = require('./util');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const env = require('../config/prod.env');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,

    plugins: [
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        new CleanWebpackPlugin()
        //new BundleAnalyzerPlugin()
    ]
});

module.exports = webpackConfig;
