const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode:"production",
    entry:{
        bundle: path.resolve(__dirname,"src")},// Eğer birden çok webpack JS dosyası oluşturmak istersek entry'i bir object haline getiririz ardından vermek istediğimiz ismi object içine yazar ver karşısına uygun path.resolve() fonksiyonunu yazarız
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:"[name][contenthash].js", //[name] entry objesindeki tüm enrty pointler için otomatik olarak belirtilen bir dosyada bir output JS si oluşturmayı sağlar + [contenthash] bizim dosyaları önbelleklememizi(caching) sağlar
        clean:true,
        assetModuleFilename: "[name][ext]"
    },
    devServer: {
        static:{
            directory: path.resolve(__dirname,"dist")
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true
    },  
    module: {
        rules:[
            {
                test:/\.scss$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.js$/,
                exclude: [
                    /node_modules/,
                    /data/
                ],
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"]
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:"asset/resource"
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"Türkçe Sözlük",
            filename:"index.html",
            template:"src/main.html"
        }),
        new BundleAnalyzerPlugin()
    ]
}