/**
 * @apiDefine userInfo
 * @apiSuccess {Number} id
 * @apiSuccess {String} name 用户名
 * db.users.insert({"sequenceName" : "UserId", "sequenceValue" : -1})
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // 个人简介
    introduce: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    headPic: {
      type: String,
      default:
        "https://img2.woyaogexing.com/2020/05/11/a3db755ca5bf4cc7a8857cf563450871!400x400.jpeg",
    },
    nickName: {
      type: String,
      default: null,
    },
    loginStatus: {
      type: Number,
      default: 0,
    },
    accountToken: {
      type: String,
      default: null,
    },
    createTime: {
      type: Number,
      default: new Date().getTime(),
    },
  },
  { id: false }
);

module.exports = mongoose.model("users", userSchema);
