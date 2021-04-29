import $axios from "@/utils/front/request";
import { fugueReader } from "@/api/front";

export const getChapterContentByArticleDetailId = (params = {}) =>
  $axios.get(fugueReader.books.getChapterContentByArticleDetailId, {
    params,
  });
export const getListByType = (params = {}) =>
  $axios.get(fugueReader.books.getListByType, {
    params,
  });
