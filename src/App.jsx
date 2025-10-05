import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  const [page, setPage] = useState("login");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    if (page === "quiz") {
      fetch(`${BACKEND_URL}/api/quiz`)
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error("Error fetching quiz:", err));
    }
  }, [page]);

  const handleStartQuiz = () => {
    setAnswers({});
    setResults(null);
    setPage("quiz");
  };

  const handleSubmitQuiz = (answers) => {
    fetch(`${BACKEND_URL}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setPage("result");
      })
      .catch((err) => console.error("Error submitting quiz:", err));
  };

  const handleRestart = () => {
    setPage("login");
    setAnswers({});
    setResults(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-400 to-blue-500">
      {page === "login" && <LoginPage onStart={handleStartQuiz} />}
      {page === "quiz" && questions.length > 0 && (
        <QuizPage
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmitQuiz}
        />
      )}
      {page === "result" && <ResultPage results={results} onRestart={handleRestart} />}
    </div>
  );
}
