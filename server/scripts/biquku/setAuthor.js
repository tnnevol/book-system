const Model = require("../../model/Author");
const { getNextSequenceValue } = require("../../service/utils/model-tools");

const saveToModel = async ({ name } = {}) => {
  const res = await Model.find({ name }).exec();
  if (res.length > 0) {
    console.log(`作者-${name}-已存在`);
    return res[0];
  }

  console.log(`作者-${name}-即将存入...`);
  const _id = await getNextSequenceValue(Model, "AuthorId");
  const model = new Model({
    id: _id,
    name,
    createTime: Date.now(),
  });
  return new Promise((resolve, reject) => {
    model.save((err, product) => {
      if (err) return reject(err);
      console.log(`作者-product: ${product.name}`);
      console.log(`作者-${name}-已存入库`);
      resolve(product);
      // process.exit();
    });
  });
};

module.exports = saveToModel;
