const setAuthor = require("./setAuthor");
const setArticle = require("./setArticle");
const setArticleType = require("./setArticleType");
const setArticleDetaile = require("./setArticleDetaile");
const Author = require("../../model/Author");
const Article = require("../../model/Article");
const glob = require("glob");
const fs = require("fs-extra");
const mongoDB = require("../../model");
const { findOne } = require("../../service/utils/model-tools");

async function insertAuthor() {
  await mongoDB();
  const filePathList = glob.sync(
    "/home/tnnevol/Documents/jsonFile/books/*.json"
  );
  for (let i = 0; i < filePathList.length; i++) {
    const pathStr = filePathList[i];
    const jsonList = fs.readJsonSync(pathStr);
    for (let j = 0; j < jsonList.length; j++) {
      const bookInfo = jsonList[j];
      console.log(`第${i + 1}文件中的---第${j + 1}本书---${bookInfo.name}`);
      try {
        await setAuthor({
          name: bookInfo.author,
        });
      } catch (e) {
        console.log(`第${i + 1}文件中的---第${j + 1}本书---存入失败`);
        console.log(e);
      }
    }
  }
}
async function insertArticle() {
  await mongoDB();
  const filePathList = glob.sync(
    "/home/tnnevol/Documents/jsonFile/books/*.json"
  );
  const mappingType = ["玄幻", "修真", "都市", "穿越", "网游", "科幻"];
  for (let i = 0; i < filePathList.length; i++) {
    const pathStr = filePathList[i];
    const jsonList = fs.readJsonSync(pathStr);
    for (let j = 0; j < jsonList.length; j++) {
      const bookInfo = jsonList[j];
      try {
        const res = await findOne(Author, { name: bookInfo.author });
        console.log(`第${i + 1}文件中的---第${j + 1}本书---${bookInfo.name}`);
        await setArticle({
          url: bookInfo.bookId,
          name: bookInfo.name,
          cover: bookInfo.pic,
          typeId: mappingType.indexOf(bookInfo.type) + 1,
          status: bookInfo.status,
          authorId: res.id,
          desc: bookInfo.content,
        });
      } catch (e) {
        console.log(`第${i + 1}文件中的---第${j + 1}本书---存入失败`);
        console.log(e);
      }
    }
  }
}
async function insertArticleType() {
  await mongoDB();
  const mappingType = ["玄幻", "修真", "都市", "穿越", "网游", "科幻"];
  for (let index = 0; index < mappingType.length; index++) {
    const element = mappingType[index];
    await setArticleType({
      name: element,
    });
  }
}
async function insertArticleDetail() {
  await mongoDB();
  const filePathList = glob.sync(
    "/home/tnnevol/Documents/jsonFile/books/*.json"
  );
  for (let i = 0; i < filePathList.length; i++) {
    const pathStr = filePathList[i];
    const jsonList = fs.readJsonSync(pathStr);
    for (let j = 0; j < jsonList.length; j++) {
      const bookInfo = jsonList[j];
      for (let k = 0; k < bookInfo.chapterList.length; k++) {
        const chapterInfo = bookInfo.chapterList[k];
        try {
          const resAuthor = await findOne(Author, { name: bookInfo.author });
          const resArticle = await findOne(Article, { authorId: resAuthor.id });
          console.log(
            `第${i + 1}文件中的---第${j + 1}本书---${
              bookInfo.name
            }---第${k}章：${chapterInfo.title}`
          );
          await setArticleDetaile({
            articleId: resArticle.id,
            name: chapterInfo.title,
            url: chapterInfo.id,
          });
        } catch (e) {
          console.log(`第${i + 1}文件中的---第${j + 1}本书---存入失败`);
          console.log(e);
        }
      }
    }
  }
}
insertArticleType();
