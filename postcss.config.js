module.exports = ({ file }) => {
  return {
    plugins: [
      require("postcss-import"),
      require("autoprefixer"),
      require("postcss-plugin-px2rem")({
        rootValue: /(front)/gi.test(file) ? 37.5 : 192,
        exclude: /(node_modules|admin)/, // 去除管理后台
        // 白名单 允许css属性转换成rem
        propWhiteList: [],
        // 黑名单 不允许css属性转换成rem
        propBlackList: ["font-size"],
        // 黑名单 类名禁止转换rem
        selectorBlackList: ["no2rem"],
        minPixelValue: 6,
      }),
    ],
  };
};
