const path= require('path');
const  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : "./src/index.js",
    output:{
        path: path.join(__dirname,'/dist'),
        filename: 'index_bundle.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname,'./public'),
        historyApiFallback: true
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : './pubic/index.html'
        })
    ]
}