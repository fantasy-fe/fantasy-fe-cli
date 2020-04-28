/**
 * Copyright (c) 2020-present liying Holding Limited
 * @author liying <ly.boy2012@gmail.com>
 * @Description: 模版查看
 * @Date: 2020-04-14 12:21:40
 */

const chalk = require("chalk");

const _ = require("lodash");
const debug = require("debug");

const tpl = require("../utils/template.js");

const log = debug("fantasy-cli:list");

const templateList = () => {
  const list = tpl.getTplList();
  const listArr = _.toArray(list);
  let style = "yellow";

  log(`templateList`);

  console.log(chalk.yellow(`已有模版列表：\n`));
  listArr.forEach((item) => {
    style = item.disabledInfo ? "gray" : "yellow";
    console.log(chalk`   {cyanBright ${item.name}} - {${style} ${item.desc}}`);
    console.log(chalk`     gitlab：{green.underline ${item.readme}}\n`);
  });
  console.log();
};
templateList();
