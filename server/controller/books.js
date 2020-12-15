const Controller = require("./lib/Controller");
const ServeceBooks = require("../service/Books");
const serviceBooks = new ServeceBooks();

/**
 * @apiDefine ErrorResponse
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        status: 0,
 *        msg: '参数错误',
 *        data: null
 *     }
 */

class BookController extends Controller {
  /**
   * @api {get} /api/books/get/type getType.
   * @apiSampleRequest /api/books/get/type
   * @apiName getType
   * @apiDescription 获取书籍类型
   * @apiVersion 1.0.0
   * @apiGroup Books
   *
   * @apiSuccess {Object} data
   * @apiUse articleTypeInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  async getType(ctx) {
    const resInfo = await serviceBooks.getArticleTypeModel(ctx.request.body);
    ctx.body = {
      type: resInfo.type,
      data: resInfo.data,
    };
  }
  /**
   * @api {get} /api/books/get/listByType getListByType.
   * @apiSampleRequest /api/books/get/listByType
   * @apiName getListByType
   * @apiDescription 通过书籍类型获取书籍列表
   * @apiVersion 1.0.0
   * @apiGroup Books
   *
   * @apiParam {Number} typeId 书籍类型id default 1
   * @apiParam {Number} page 分页数 default 0
   * @apiParam {Number} count 一页的总数 default 20
   *
   * @apiSuccess {Object} data
   * @apiUse articleInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  async getListByType(ctx) {
    try {
      const { typeId = 1, page = 0, count = 20 } = ctx.query;
      const resInfo = await serviceBooks.getListByType(typeId, page, count);
      ctx.body = {
        type: resInfo.type,
        data: resInfo.data,
      };
    } catch (e) {
      ctx.body = {
        type: "paramsError",
        data: e,
      };
    }
  }
}
module.exports = BookController;
