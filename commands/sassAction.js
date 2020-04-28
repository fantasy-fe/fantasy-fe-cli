var sass = require("gulp-sass"),
  chalk = require("chalk"),
  Util = require("../utils/util"),
  gulp = require("gulp");

var sassMain = {
  sassMake: function () {
    sassChange();
  },
  sassWatch: function () {
    console.log(chalk.green("  正在监听..."));
    var conf;
    Util.getConfig(function (config) {
      conf = config;
    });
    var watcher = gulp.watch(conf.sass.sassUrl + "*.scss");
    watcher.on("change", function (event) {
      sassChange();
    });
  },
};

/**
 * [sassChange sass文件编译方法]
 * @return {[type]} [description]
 */
function sassChange() {
  var conf;
  Util.getConfig(function (config) {
    conf = config;
  });
  return gulp
    .src("scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("css"));
}

module.exports = sassMain;
