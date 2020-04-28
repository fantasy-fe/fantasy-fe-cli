#!/usr/bin/env node
const program = require("commander");
const initAction = require("./commands/initAction");
const SassMain = require("./commands/sassAction.js");
program
  .version(require("./package.json").version)
  .option("-v,--version", "查看版本号");

program
  .command("init <name>")
  .option("-d, --dev", "获取开发模板")
  .description("创建项目")
  .action(initAction);

program.command("tplist", "查看模板列表");

program.parse(process.argv);

if (program.init) {
  console.log("init something");
}

if (program.generate) {
  console.log("generate something");
}

if (program.remove) {
  console.log("remove something");
}
