/**
 * 书籍信息
 * 用于创建Author表
 * @type {*|Mongoose}
 * db.authors.insert({"sequenceName" : "AuthorId", "sequenceValue" : -1})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const authorsSchema = new Schema({
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
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  // 个人简介
  introduce: {
    type: String,
    default: null,
  },
  headPic: {
    type: String,
    default:
      "https://img2.woyaogexing.com/2020/05/11/a3db755ca5bf4cc7a8857cf563450871!400x400.jpeg",
  },
  createTime: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("authors", authorsSchema);
