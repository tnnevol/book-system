const Article = require("../model/Article");
const ArticleType = require("../model/ArticleType");
const ArticleDetail = require("../model/ArticleDetail");
const {
  find,
  modelPagination,
  modelCount,
  findOne,
} = require("./utils/model-tools");
// const {
//   getNextSequenceValue,
//   findOne,
//   createModelOne,
// } = require("./utils/model-tools");

class Books {
  /**
   * 获取书籍类型表
   */
  async getArticleTypeModelServer() {
    return {
      type: "success",
      data: await find(ArticleType, null, { _id: 0, __v: 0 }, { skip: 1 }),
    };
  }
  /**
   * 通过书籍类型获取书籍列表
   * @param {Number} typeId
   * @param {Number} page
   * @param {Number} count
   */
  async getListByTypeServer(typeId, page, count) {
    return {
      type: "success",
      data: {
        list: await modelPagination(
          Article,
          { typeId },
          { _id: 0, __v: 0, url: 0 },
          { id: 1 },
          page,
          count
        ),
        count: await modelCount(Article, { typeId }),
      },
    };
  }

  /**
   * 通过书籍id获取章节列表
   * @param {Number} articleId
   * @param {Number} page
   * @param {Number}count
   * @returns {Promise<{type: String data: Object}>}
   */
  async getChapterListByArticleIdServer(articleId, page, count) {
    return {
      type: "success",
      data: {
        list: await modelPagination(
          ArticleDetail,
          { articleId },
          { _id: 0, __v: 0, url: 0 },
          { id: 1 },
          page,
          count
        ),
        count: await modelCount(ArticleDetail, { articleId }),
      },
    };
  }

  /**
   * 通过章节id获取章节内容
   * @param articleDetailId
   * @returns {Promise<{data: String}>}
   */
  async getChapterContentByArticleDetailIdServer(articleDetailId) {
    // 查询章节
    const chapterInfo = await findOne(
      ArticleDetail,
      { id: articleDetailId },
      { _id: 0, __v: 0 }
    );
    const [chapterAll, bookInfo] = await Promise.all([
      // 查询该书的所有章节
      ArticleDetail.find({
        articleId: chapterInfo.articleId,
      }).select("id -_id"),
      // 通过书籍id查询书籍
      findOne(Article, { id: chapterInfo.articleId }, { _id: 0, __v: 0 }),
    ]);
    // 查询该书的所有章节
    // const chapterAll = await ArticleDetail.find({
    //   articleId: chapterInfo.articleId,
    // }).select("id -_id");

    // 通过书籍id查询书籍
    // const bookInfo = await findOne(
    //   Article,
    //   { id: chapterInfo.articleId },
    //   { _id: 0, __v: 0 }
    // );
    return {
      type: "success",
      data: {
        chapterIndex: chapterAll.findIndex(
          ({ id }) => id === Number(articleDetailId)
        ),
        bookName: bookInfo.name,
        title: chapterInfo.name,
        url: bookInfo.url + chapterInfo.url,
        count: await modelCount(ArticleDetail, {
          articleId: chapterInfo.articleId,
        }),
      },
    };
  }
}

module.exports = Books;
