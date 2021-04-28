const Controller = require("./lib/Controller");
const ServiceBooks = require("../service/Books");
const serviceBooks = new ServiceBooks();

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
  constructor() {
    super();
  }
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
  async getTypeController(ctx) {
    const resInfo = await serviceBooks.getArticleTypeModelServer(
      ctx.request.body
    );
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
   * @apiSuccess {Number} data.count
   * @apiUse articleInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  async getListByTypeController(ctx) {
    try {
      const { typeId = 1, page = 0, count = 20 } = ctx.query;
      const resInfo = await serviceBooks.getListByTypeServer(
        typeId,
        page,
        count
      );
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
  /**
   * @api {get} /api/books/get/chapterListByArticleId getChapterListByArticleId.
   * @apiSampleRequest /api/books/get/chapterListByArticleId
   * @apiName getChapterListByArticleId
   * @apiDescription 通过书籍id获取章节列表
   * @apiVersion 1.0.0
   * @apiGroup Books
   *
   * @apiParam {Number} articleId 书籍id
   * @apiParam {Number} page 分页数 default 0
   * @apiParam {Number} count 一页的总数 default 20
   *
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.count
   * @apiUse articleDetailInfo
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiUse ErrorResponse
   */
  async getChapterListByArticleIdController(ctx) {
    try {
      const { articleId, page = 0, count = 20 } = ctx.query;
      const resInfo = await serviceBooks.getChapterListByArticleIdServer(
        articleId,
        page,
        count
      );
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

  async getChapterContentByArticleDetailIdController(ctx) {
    try {
      const { id } = ctx.query;
      const {
        data: resInfo,
        type,
      } = await serviceBooks.getChapterContentByArticleDetailIdServer(id);
      const contentHtml = await super.getHtmlContentController(
        resInfo.url,
        "#content"
      );
      ctx.body = {
        type,
        data: {
          chapterIndex: resInfo.chapterIndex + 1,
          bookName: resInfo.bookName,
          title: resInfo.title,
          count: resInfo.count,
          content: contentHtml,
        },
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        type: "paramsError",
        data: e,
      };
    }
  }
}
module.exports = BookController;
