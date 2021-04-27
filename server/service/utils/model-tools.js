module.exports = {
  /**
   * 集合总数
   * @param Model {Model}
   * @param query {Object}
   * @returns {Promise}
   */
  async modelCount(Model, query) {
    return Model.find(query || null)
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
    return Model.find(query, { sequenceName: 0, sequenceValue: 0, ...ignore })
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
   * 按条件查询一条数据
   * @param {Model} Model 表
   * @param {Object} query 查询条件
   * @param {Object} ignore 过滤条件
   * @returns {Promise}
   */
  findOne(Model, query, ignore) {
    return new Promise((resolve, reject) => {
      Model.findOne(query, {
        sequenceName: 0,
        sequenceValue: 0,
        ...ignore,
      }).exec((err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  /**
   * 按条件查询返回数组
   * @param {Model} Model 表
   * @param {Object} query 查询条件
   * @param {Object} projection 字段过滤
   * @param {Object} options 查询规则
   * @returns {Promise}
   */
  find(Model, query, projection, options) {
    return new Promise((resolve, reject) => {
      Model.find(query, projection, options).exec((err, result) => {
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
   * 创建一条数据
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
