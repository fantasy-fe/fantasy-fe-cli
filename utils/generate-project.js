const debug = require("debug"),
  path = require("path"),
  fs = require("fs-extra"),
  replaceStream = require("replacestream");

const _ = require("lodash"),
  ora = require("ora"),
  { State } = require("./util");

const log = debug("i-cli:generate-project");

const inludeFiletypes = [
  ".sh",
  ".html",
  ".js",
  ".json",
  ".md",
  ".vue",
  ".css",
  ".less",
  ".sass",
  ".ejs",
  ".jsx",
  ".yml",
];

/**
 * 生成项目
 */

const replaceFile = (uri, replace, dest, repaceUri) => {
  let target = _.replace(uri, "{name}", replace); // 写入的文件路径
  log(`befor target:${target} `);
  log(`repaceUri: ${repaceUri} dest:${dest}`);
  target = _.replace(target, repaceUri, dest);

  log(`after target:${target}`);
  fs.ensureFile(target, (err) => {
    if (!err) {
      const extname = path.extname(path.basename(target));

      if (_.indexOf(inludeFiletypes, extname) !== -1) {
        log(`---target: ${target}`);
        fs.createReadStream(uri)
          .pipe(replaceStream("{{{name}}}", replace))
          .pipe(fs.createWriteStream(target));
      } else {
        fs.createReadStream(uri, { encoding: "binary" }).pipe(
          fs.createWriteStream(target, { encoding: "binary" })
        );
      }
    }
  });
};

const traversalDir = (uri, replace, dest, templateUri) => {
  log(`templateUri:${templateUri}`);
  fs.readdirSync(uri).forEach((file) => {
    // 读取文件并遍历
    ((fileName, root) => {
      const localUri = path.resolve(root, fileName);
      if (fs.lstatSync(localUri).isDirectory()) {
        traversalDir(localUri, replace, dest, templateUri); // 递归遍历文件
      } else {
        replaceFile(localUri, replace, dest, templateUri); //  如果是文件做替换
      }
    })(file, uri);
  });
};
const generate = (template, dest, projectName) => {
  const spinner = ora("项目生成中").start();

  let result;
  try {
    traversalDir(template, projectName, dest, template);
    result = { state: State.Succss, msg: "项目生成完成" };
    console.log("====generate end 77777=======");
  } catch (error) {
    result = { state: State.Fail, msg: "fail" };
    log(`项目生成失败：${error}`);
  } finally {
    spinner.stop();
  }

  console.log("====generate end result=======");
  return result;
};
module.exports = generate;
