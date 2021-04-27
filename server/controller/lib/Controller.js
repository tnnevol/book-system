const cheerio = require("cheerio");
const $axios = require("../../utils/request");
class Controller {
  constructor() {}
  /**
   * 获取第三方的html
   * @param url {String} 请求地址
   * @param selector {String} 元素选择器
   * @returns {Promise<*|jQuery>}
   */
  async getHtmlContentController(url, selector) {
    const data = await $axios.get(url);
    const $ = cheerio.load(data);
    return $(selector).html();
  }
}

module.exports = Controller;
