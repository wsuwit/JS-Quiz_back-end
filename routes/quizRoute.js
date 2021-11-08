const express = require("express");
const quizController = require("../controllers/quizController");
const { authenticate } = require("../controllers/authController");

const router = express.Router();

router.get("/", quizController.getAllQuizzes);
router.get("/:id", authenticate, quizController.getQuiz);
router.post("/", authenticate, quizController.createQuiz);
router.put("/:id", authenticate, quizController.updateQuiz);
router.delete("/:id", authenticate, quizController.deleteQuiz);

module.exports = router;
