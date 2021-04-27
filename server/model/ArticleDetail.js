/**
 * @apiDefine articleDetailInfo
 * @apiSuccess {Number} id articleDetailId
 * @apiSuccess {String} name 章节名称
 * @apiSuccess {Number} articleId 作者id
 * @apiSuccess {String} url 章节地址
 * @apiSuccess {Number} createTime
 */
/**
 * 文章
 * 用于创建ArticleDetail表
 * @type {*|Mongoose}
 * db.articles_details.insert({"sequenceName" : "ArticleDetailId", "sequenceValue" : -1})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleDetailSchema = new Schema(
  {
    sequenceName: {
      type: String,
      default: null,
    },
    sequenceValue: {
      type: Number,
      default: null,
    },
    id: {
      type: Number,
      required: true,
    },
    articleId: {
      type: Number,
      default: null,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: null,
      required: true,
    },
    createTime: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { id: false }
);

module.exports = mongoose.model("articles_details", articleDetailSchema);
