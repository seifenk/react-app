const path = require("path");

module.exports = {
    devServer: {
        client: {
            overlay: false,
        },
        proxy: {
            "/api": {
                target: "http://localhost:3010",
                pathRewrite: { "^/api": "" },
            },
        },
    },
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            "@": path.resolve(__dirname, "src"),
        },

        // module: {
        //     rules: [
        //         {
        //             test: /\.worker\.(js|jsx|ts|tsx)$/,
        //             exclude: /node_modules/,
        //             use: ["worker-loader", "ts-loader"],
        //         },
        //     ],
        // },
    },
};
