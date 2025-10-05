import React, { useState, useEffect } from "react";

function QuizPage({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch quiz questions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
    } else {
      onFinish(score + (answer === questions[currentQuestion].answer ? 1 : 0));
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (questions.length === 0) return <p>No questions available</p>;

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div>
        {questions[currentQuestion].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{ margin: "5px", padding: "10px" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;

