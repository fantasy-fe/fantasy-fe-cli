var program = require("commander");

program
  .version("0.0.1")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq", "Add bbq sauce")
  .option(
    "-c, --cheese [type]",
    "Add the specified type of cheese [marble]",
    "marble"
  )
  .parse(process.argv);

const inquirer = require("inquirer");

// 设置问题
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "名称",
      default: "Rogan",
    },
    {
      type: "confirm",
      name: "out",
      message: "是否退出",
    },
    {
      type: "list",
      name: "phone",
      message: "选择手机品牌",
      choices: [
        { name: "小米", value: "mi" },
        { name: "华为", value: "huawei" },
        { name: "苹果", value: "apple" },
      ],
    },
  ])
  .then((answers) => {
    console.info(`你的答案:${JSON.stringify(answers)}`);
    console.log(`你的名字: `, answers.name);
  });
program.parse(process.argv);

console.log("you ordered a pizza with:");
if (program.peppers) console.log("  - peppers");
if (program.pineapple) console.log("  - pineapple");
if (program.bbq) console.log("  - bbq");
console.log("  - %s cheese", program.cheese);
