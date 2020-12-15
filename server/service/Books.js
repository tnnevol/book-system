const Article = require("../model/Article");
const ArticleType = require("../model/ArticleType");
const { find, modelPagination } = require("./utils/model-tools");
// const {
//   getNextSequenceValue,
//   findOne,
//   createModelOne,
// } = require("./utils/model-tools");

class Books {
  /**
   * 获取书籍类型表
   */
  async getArticleTypeModel() {
    return {
      type: "success",
      data: await find(
        ArticleType,
        null,
        { sequenceName: 0, sequenceValue: 0, _id: 0, __v: 0 },
        { skip: 1 }
      ),
    };
  }
  /**
   * 通过书籍类型获取书籍列表
   * @param {Number} typeId
   * @param {Number} page
   * @param {Number} count
   */
  async getListByType(typeId, page, count) {
    return {
      type: "success",
      data: await modelPagination(
        Article,
        { typeId: typeId },
        { sequenceName: 0, sequenceValue: 0, _id: 0, __v: 0 },
        { createTime: 1 },
        page,
        count
      ),
    };
  }
}

module.exports = Books;
