const quizService = require("../services/quizService");

exports.getAllQuizzes = async (req, res, next) => {
  try {
    const result = await quizService.findAll();

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await quizService.findById(id);

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const { subject, questions } = req.body;

    if (req.user.role === "admin") {
      const result = await quizService.save({
        subject,
        questions
      });

      return res.status(201).json({ result });
    }
    return res.status(401).json({ message: "You are unauthorized." });
  } catch (err) {
    next(err);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, questions } = req.body;

    if (req.user.role === "admin") {
      const result = await quizService.updateById(id, {
        subject,
        questions
      });

      if (!result) {
        return res
          .status(400)
          .json({ message: "Quiz with this id is not found." });
      }

      return res.json({ result });
    }

    return res.status(401).json({ message: "You are unauthorized." });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === "admin") {
      const result = await quizService.deleteById(id);

      if (!result) {
        return res
          .status(400)
          .json({ message: "Quiz with this id is not found." });
      }

      res.status(204).json();
    }
    return res.status(401).json({ message: "You are unauthorized." });
  } catch (err) {
    next(err);
  }
};
