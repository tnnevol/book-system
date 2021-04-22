/**
 * @apiDefine articleInfo
 * @apiSuccess {Number} id bookId
 * @apiSuccess {String} name 书名
 * @apiSuccess {String} cover 封面
 * @apiSuccess {Number} typeId 书籍类型
 * @apiSuccess {Number} authorId 作者id
 * @apiSuccess {String} desc 书籍描述
 * @apiSuccess {String} status 书籍连载状态
 * @apiSuccess {Number} createTime
 * @apiSuccess {Number} updateTime
 */
/**
 * 书籍信息
 * 用于创建Article表
 * @type {*|Mongoose}
 * db.articles.insert({"sequenceName" : "ArticleId", "sequenceValue" : -1})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema(
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
    url: {
      type: String,
      default: null,
      required: true,
    },
    name: {
      type: String,
      default: null,
      required: true,
    },
    cover: {
      type: String,
      default: null,
    },
    typeId: {
      type: Number,
      default: null,
      required: true,
    },
    authorId: {
      type: Number,
      default: null,
      required: true,
    },
    desc: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    updateTime: {
      type: Number,
      default: new Date().getTime(),
    },
    createTime: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { id: false }
);

module.exports = mongoose.model("articles", articleSchema);
