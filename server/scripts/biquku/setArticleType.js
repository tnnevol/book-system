const Model = require("../../model/ArticleType");
const { getNextSequenceValue } = require("../../service/utils/model-tools");

const saveToModel = async ({ name } = {}) => {
  const _id = await getNextSequenceValue(Model, "ArticleTypesId");
  const article = new Model({
    id: _id,
    name,
    createTime: Date.now(),
    updateTime: Date.now(),
  });
  return new Promise((resolve, reject) => {
    article.save((err, product) => {
      if (err) return reject(err);
      console.log(`${_id}：已存入${name}类型`);
      resolve(product);
    });
  });
};

module.exports = saveToModel;
