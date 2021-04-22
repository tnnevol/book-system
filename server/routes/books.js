module.exports = function (router, controller) {
  // 获取书籍类型
  router.get("/books/get/type", controller.books.getType);
  // 通过书籍类型获取书籍列表
  router.get("/books/get/listByType", controller.books.getListByType);
};
