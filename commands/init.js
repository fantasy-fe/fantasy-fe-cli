const inquirer = require("inquirer");

// 定义需要询问的问题
const questions = [
  {
    type: "input",
    message: "请输入模板名称:",
    name: "name",
    validate(val) {
      if (!val) return "模板名称不能为空！";
      if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g))
        return "模板名称包含非法字符，请重新输入";
      return true;
    },
  },
  {
    type: "input",
    message: "请输入模板关键词（;分割）:",
    name: "keywords",
  },
  {
    type: "input",
    message: "请输入模板简介:",
    name: "description",
  },
  {
    type: "list",
    message: "请选择模板类型:",
    choices: ["响应式", "桌面端", "移动端"],
    name: "type",
  },
  {
    type: "list",
    message: "请选择模板分类:",
    choices: ["整站", "单页", "专题"],
    name: "category",
  },
  {
    type: "input",
    message: "请输入模板风格:",
    name: "style",
  },
  {
    type: "input",
    message: "请输入模板色系:",
    name: "color",
  },
  {
    type: "input",
    message: "请输入您的名字:",
    name: "author",
  },
];
// 通过inquirer获取到用户输入的内容
const answers = await inquirer.prompt(questions);
// 将用户的配置打印，确认一下是否正确
console.log("------------------------");
console.log(answers);
let confirm = await inquirer.prompt([
  {
    type: "confirm",
    message: "确认创建？",
    default: "Y",
    name: "isConfirm",
  },
]);
if (!confirm.isConfirm) return false;
