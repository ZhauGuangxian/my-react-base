/*
 * @Author: your name
 * @Date: 2019-12-05 14:27:49
 * @LastEditTime : 2019-12-26 11:02:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-service-front\build\webpack.config.dev.js
 */
const path = require('path');

const config = require('../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const utils = require('./util');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

/**
 * @param dir
 */
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const os = require('os');

/**
 *
 */
function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}
const trueHost = getNetworkIp();
const devWebpackConfig = merge(baseWebpackConfig, {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: config.dev.devtool,
    devServer: {
        hot: true,
        compress: true,
        contentBase: path.join(__dirname, './dist'),
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        proxy: config.dev.proxyTable,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath
    }
});
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}
                            http://${trueHost}:${port}`
                        ]
                    },
                    onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
                })
            );

            resolve(devWebpackConfig);
        }
    });
});
