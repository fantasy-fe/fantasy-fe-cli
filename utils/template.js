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
const getGitRepo = (key) => {
  return list[key] ? list[key].git : null;
};
const getName = (key) => {
  return list[key] ? list[key].name : null;
};
const tplChoices = () => {
  const keys = Object.keys(list);
  const result = [];
  keys.forEach((key) => {
    const item = {
      name: list[key].name,
      value: key,
    };
    if (list[key].disabledInfo) item.disabled = list[key].disabledInfo;
    result.push(item);
  });
  return result;
};
module.exports = {
  getTplList,
  getGitRepo,
  getName,
  tplChoices,
};
