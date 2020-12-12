const Model = require("../../model/Article");
const { getNextSequenceValue } = require("../../service/utils/model-tools");

const saveToModel = async ({
  url,
  name,
  cover,
  typeId,
  status,
  authorId,
  desc,
} = {}) => {
  const res = await Model.find({ name, authorId }).exec();
  if (res.length > 0) {
    console.log(`书本-${name}-已存在`);
    return res[0];
  }

  console.log(`书本-${name}-即将存入...`);
  const _id = await getNextSequenceValue(Model, "ArticleId");
  const article = new Model({
    id: _id,
    url,
    name,
    cover,
    typeId,
    status,
    authorId,
    desc,
    createTime: Date.now(),
  });
  return new Promise((resolve, reject) => {
    article.save((err, product) => {
      if (err) return reject(err);
      console.log(`书本-product: ${product}`);
      console.log(`书本-${name}-已存入库`);
      resolve(product);
      // process.exit();
    });
  });
};

module.exports = saveToModel;
