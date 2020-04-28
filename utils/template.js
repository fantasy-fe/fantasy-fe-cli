//import yaml from "js-yaml";
//import fs, { createReadStream, createWriteStream } from "fs";
//import path from "path";
//import debug from "debug";

//import downloadTpl from "./down-load-tpl";

//const log = debug("mario-cli:template");

const templateInfo = require("../template.js");

const list = templateInfo && templateInfo.list ? templateInfo.list : null;

const getTplList = () => {
  return list;
};

module.exports = {
  getTplList,
};
