module.exports = {
  /**
   * 集合总数
   * @param model
   * @param type
   * @returns {Promise}
   */
  async modelCount(model, type, field) {
    const term = type ? { [field]: type } : null;
    return model
      .find(term)
      .countDocuments() // count 即将废弃尽量不要使用
      .exec();
  },

  /**
   * 模型分页
   * @param {*} Model
   * @param {Object} query
   * @param {Object} ignore
   * @param {Object} sort
   * @param {Number} page
   * @param {Number} count
   * @returns {Promise}
   */
  modelPagination(Model, query, ignore, sort, page, count) {
    page = Number(page);
    count = Number(count);
    return Model.find(query, ignore)
      .sort(sort)
      .skip(page * count)
      .limit(count)
      .exec();
  },
  /**
   * 实现自增
   * @param Model
   * @param sequenceName
   * @returns {Promise}
   */
  getNextSequenceValue(Model, sequenceName) {
    const query = {
      sequenceName,
    };
    const update = { $inc: { sequenceValue: 1 } };

    return new Promise((resolve, reject) => {
      Model.findOneAndUpdate(query, update, { new: true }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          return resolve(res.sequenceValue);
        }
      });
    });
  },
  /**
   *
   * @param {Model} Model 表
   * @param {Object} quert 查询条件
   * @param {Object} filter 过滤条件
   * @returns {Promise}
   */
  findOne(Model, quert, filter) {
    return new Promise((resolve, reject) => {
      Model.findOne(quert, filter).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  /**
   *
   * @param {Model} Model 表
   * @param {Object} quert 查询条件
   * @param {Object} projection 字段过滤
   * @param {Object} options 查询规则
   * @returns {Promise}
   */
  find(Model, quert, projection, options) {
    return new Promise((resolve, reject) => {
      Model.find(quert, projection, options).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  /**
   * 更新表字段
   * updateOne
   * @param Model
   * @param query
   * @param update
   * @returns {Promise}
   */
  updateOne(Model, query, update) {
    return new Promise((resolve, reject) => {
      Model.updateOne(query, update, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  /**
   *
   * @param {Model} Model 表
   * @param {Object} schema 表模型的字段
   * @returns {Promise}
   */
  createModelOne(Model, schema) {
    const model = new Model(schema);
    return new Promise((resolve, reject) => {
      model.save((err, product) => {
        if (err) return reject(err);
        resolve(product);
      });
    });
  },
};
