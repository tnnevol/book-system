module.exports = function (router, controller) {
  // 获取书籍类型
  router.get("/books/get/type", controller.books.getTypeController);
  // 通过书籍类型获取书籍列表
  router.get("/books/get/listByType", controller.books.getListByTypeController);
  // 通过书籍id获取章节列表
  router.get(
    "/books/get/chapterListByArticleId",
    controller.books.getChapterListByArticleIdController
  );
  // 通过章节id获取章节内容
  router.get(
    "/books/get/chapterContentByArticleDetailId",
    controller.books.getChapterContentByArticleDetailIdController
  );
};
