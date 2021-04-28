import $axios from "@/utils/front/request";
import { fugueReader } from "@/api/front";

export const getChapterContentByArticleDetailId = (params = {}) => {
  return $axios.get(fugueReader.books.getChapterContentByArticleDetailId, {
    params,
  });
};
