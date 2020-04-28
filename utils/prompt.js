const inquirer = require("inquirer");

const prompt = async (question) => {
  const result = await inquirer.prompt(question);
  return result;
};

const confirm = async (message) => {
  const result = await prompt([
    {
      type: "confirm",
      name: "confirm",
      message,
    },
  ]);
  return result;
};

module.exports = {
  prompt,
  confirm,
};
