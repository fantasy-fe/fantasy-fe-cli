const download = require("download-git-repo");
const debug = require("debug");
const ora = require("ora");
const { State } = require("./util");

const log = debug("mario-cli:down-load-tpl");

const downLoadTpl = (repo, dest) => {
  return new Promise((resolve, reject) => {
    const spinner = ora("模版下载中").start();
    download(repo, dest, { clone: false }, (err) => {
      spinner.stop();
      if (!err) {
        resolve({ state: State.Succss, msg: "success" });
      } else {
        log(`下载模版异常：${err}`);
        reject(new Error("下载模版异常"));
      }
    });
  });
};
module.exports = downLoadTpl;
