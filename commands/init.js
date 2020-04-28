const path = require("path");
const userHome = require("user-home");
const { existsSync } = require("fs");
const inquirer = require("inquirer");
const debug = require("debug");
const { prompt, confirm } = require("../utils/prompt");

const downLoadTpl = require("../utils/download-tpl");

const tpl = require("../utils/template");

const generate = require("../utils/generate-project");

const log = debug("mario-cli:init");

const init = async () => {
  console.log("init---------");
  try {
    // 1、提示选择模版及项目名称
    const choices = tpl.tplChoices();
    const answers = await prompt([
      {
        type: "list",
        name: "template",
        message: "请选择工程模版?",
        choices,
      },
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称",
      },
    ]);
    console.log(`answers: ${JSON.stringify(answers)}`);

    if (answers) {
      const repo = tpl.getGitRepo(answers.template);
      const templateName = tpl.getName(answers.template);

      const projectName = answers.projectName;

      // 2、确认选择
      const confirmAnswers = await confirm(
        `当前目录创建 ${projectName} 项目,项目模版（${templateName}）?`
      );
      log(`confirmAnswers:${JSON.stringify(confirmAnswers)}`);
      if (!confirmAnswers.confirm) return;

      // 3、拉去模版
      const templatePath = path.join(
        userHome,
        ".mario-cli-templates",
        answers.template
      );
      console.log(`templatePath: ${templatePath}`);
      console.log(`confirmAnswers:${JSON.stringify(confirmAnswers)}`);
      console.log(existsSync(templatePath));
      if (!existsSync(templatePath)) {
        // 如果本地模版不存在服务拉取
        console.info("download -------");
        const result = await downLoadTpl(repo, templatePath);
        console.info(result);
        if (result.state !== 0) return;
      }

      // 4、通过模版生产项目
      const cwd = process.cwd();
      const dest = path.join(cwd, projectName);
      console.log(dest);
      generate(templatePath, dest, projectName);
      // console.log('====generate end =======');
    }
  } catch (error) {
    log(`初始化失败：${error}`);
  }
};

module.exports = init;
