module.exports = {
    entry: "./src",
    output: {
        path: __dirname + "../../src/static/js",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                presets: [[
                    "@babel/preset-react",
                    {runtime: "automatic"}
                ]]
            },
            resolve: {
                extensions: [".js", ".jsx"]
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}