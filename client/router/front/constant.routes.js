export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/front/Home"),
    redirect: "/onlineBookList",
    children: [
      {
        // 在线图书列表
        path: "onlineBookList",
        name: "OnlineBookList",
        component: () => import("@/views/front/onlineLibrary/BookList"),
      },
    ],
  },
  {
    path: "/reading/:articleDetailId",
    name: "ReadingContent",
    component: () => import("@/views/front/ReadingContent"),
  },
];
