const path = require("path");
const fs = require("fs");

module.exports = {
  State: {
    Succss: 0,
    Fail: 1,
  },
  /**
   * 获取cain config文件
   */
  getConfig: function (callback) {
    var configPath = path.join(process.cwd(), "scss.conf.js");
    console.log(configPath);
    debugger;
    var config = {};
    if (fs.existsSync(configPath)) {
      try {
        config = eval(fs.readFileSync(configPath, "utf-8"));
        console.info("config:", config);
        callback && callback(config);
      } catch (e) {
        console.log("读取cain.config.js文件失败");
      }
    } else {
      console.log("cain.config.js文件不存在，请检查后再试");
    }
  },
};
