const { v4: uuidv4 } = require("uuid");
const { getQuizzes, saveQuizzes } = require("../utils/file");

exports.findAll = () => getQuizzes();

exports.findById = async (id) => {
  const quizzes = await getQuizzes();
  return quizzes.find((elem) => elem.id === id) ?? null;
};

exports.save = async (data) => {
  const quizzes = await getQuizzes();
  const quiz = { id: uuidv4(), ...data };
  quizzes.push(quiz);
  await saveQuizzes(quizzes);
  return quiz;
};

exports.updateById = async (id, data) => {
  const quizzes = await getQuizzes();
  const idx = quizzes.findIndex((elem) => elem.id === id);
  if (idx !== -1) {
    quizzes[idx] = { id, ...data };
    await saveQuizzes(quizzes);
    return quizzes[idx];
  }
  return null;
};

exports.deleteById = async (id) => {
  const quizzes = await getQuizzes();
  const idx = quizzes.findIndex((elem) => elem.id === id);
  if (idx !== -1) {
    quizzes.splice(idx, 1);
    await saveQuizzes(quizzes);
    return true;
  }
  return false;
};
