const { readFile, writeFile } = require("fs/promises");

exports.getQuizzes = async () => {
  const data = await readFile("dbs/quizBank.json");
  return JSON.parse(data);
};

exports.saveQuizzes = (data) =>
  writeFile("dbs/quizBank.json", JSON.stringify(data));
