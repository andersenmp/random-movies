const request = require("request");
const fs = require("fs");

const localList = require("../store/modules/localTv.json");

async function download(url, dest) {
  /* Create an empty file where we can save data */
  const file = fs.createWriteStream(dest);

  /* Using Promises so that we can use the ASYNC AWAIT syntax */
  await new Promise((resolve, reject) => {
    request({
      /* Here you should specify the exact link to the file you are trying to download */
      uri: url,
      gzip: true,
    })
      .pipe(file)
      .on("finish", async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
}

// example

(async () => {
  let data = await localList.forEach((element) => {
    download(
      element.image,
      "./images/" + element.image.substring(element.image.lastIndexOf("/") + 1)
    );
    console.log(element.image);
  });
})();
