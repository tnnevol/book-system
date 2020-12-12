const Model = require("../../model/ArticleDetail");
const { getNextSequenceValue } = require("../../service/utils/model-tools");

const saveToModel = async ({ articleId, name, url } = {}) => {
  const res = await Model.find({ name, url }).exec();
  if (res.length > 0) {
    console.log(`内容-${name}-已存在`);
    return res[0];
  }

  console.log(`内容-${name}-即将存入...`);
  const _id = await getNextSequenceValue(Model, "ArticleDetailId");
  const article = new Model({
    id: _id,
    articleId,
    name,
    url,
    createTime: Date.now(),
  });
  return new Promise((resolve, reject) => {
    article.save((err, product) => {
      if (err) return reject(err);
      console.log(`内容-product: ${product}`);
      console.log(`内容-${name}-已存入库`);
      resolve(product);
    });
  });
};

module.exports = saveToModel;
