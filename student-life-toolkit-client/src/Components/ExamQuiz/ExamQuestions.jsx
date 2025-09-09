import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { CircleLoader } from 'react-spinners';

const ExamQuestions = () => {
  const { stream, subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [answers, setAnswers] = useState({}); 
  const [submitted, setSubmitted] = useState(false); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setSubmitted(false);
        setAnswers({});
        const response = await axios.get(
          "https://the-trivia-api.com/api/questions",
          {
            params: {
              categories: subject.toLowerCase() || "general_knowledge",
              limit: 5,
              difficulty: difficulty,
            },
          }
        );

        const formattedQuestions = response.data.map((q) => ({
          question: q.question,
          options: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          correct: q.correctAnswer,
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [stream, subject, difficulty]);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleAnswerSelect = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    return score;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-center text-rose-600 mb-6">
        {stream} → {subject} Quiz
      </h1>
      <div className="btn text-rose-600 mb-4">
        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="ml-2 border rounded px-2 py-1"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {loading ? (
        <p><CircleLoader color="#f43f5e" size={100} className="mx-auto"/></p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow bg-white"
            >
              <p className="font-semibold mb-2">
                {i + 1}. {q.question}
              </p>
              <ul className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isCorrect = q.correct === opt;
                  const isSelected = answers[i] === opt;

                  return (
                    <li key={idx} className="flex items-center">
                      <input
                        type="radio"
                        name={`q${i}`}
                        id={`q${i}o${idx}`}
                        value={opt}
                        checked={isSelected || false}
                        onChange={() => handleAnswerSelect(i, opt)}
                        className="mr-2"
                        disabled={submitted} 
                      />
                      <label
                        htmlFor={`q${i}o${idx}`}
                        className={
                          submitted
                            ? isCorrect
                              ? "text-green-600 font-bold"
                              : isSelected
                              ? "text-red-600 font-semibold"
                              : ""
                            : ""
                        }
                      >
                        {opt}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && questions.length > 0 && !submitted && (
        <button
          onClick={handleSubmit}
          className="mt-6 px-4 py-2 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700"
        >
          Submit
        </button>
      )}

      {submitted && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold text-center mb-2">
            Your Score: {calculateScore()} / {questions.length}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default ExamQuestions;
