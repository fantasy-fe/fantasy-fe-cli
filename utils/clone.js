const download = require("download-git-repo");
const symbols = require("log-symbols");
const ora = require("ora"); //输出loading
const chalk = require("chalk"); //改变文字颜色

function cloneFiles(remote, name, option) {
  const downSpinner = ora("下载中...").start();
  return new Promise((resolve, reject) => {
    download(remote, name, option, (err) => {
      if (err) {
        reject(err);
        return;
      }
      downSpinner.succeed(chalk.green("模板下载完成!"));
      resolve();
    });
  });
}

module.exports = cloneFiles;
