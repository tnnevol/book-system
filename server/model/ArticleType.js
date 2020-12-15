/**
 * @apiDefine articleTypeInfo
 * @apiSuccess {Number} id 书籍类型id
 * @apiSuccess {String} name 书籍类型名称
 * @apiSuccess {Number} createTime
 * @apiSuccess {Number} updateTime
 */
/**
 * 书籍类型
 * 用于创建ArticleType表
 * @type {*|Mongoose}
 * db.articles_types.insert({"sequenceName" : "ArticleTypesId", "sequenceValue" : 0})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleTypesSchema = new Schema(
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
    name: {
      type: String,
      default: null,
      required: true,
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

module.exports = mongoose.model("articles_types", articleTypesSchema);
