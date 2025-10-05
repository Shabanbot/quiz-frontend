import { useState } from "react";
import Timer from "../components/Timer";

export default function QuizPage({ questions, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // Store answers by index

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading questions...
      </div>
    );
  }

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [current]: option, // store answer by question index
    });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitQuiz = () => {
    onSubmit(answers); // send answers by index to backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-6 relative w-full">
      
      {/* Timer at top center */}
      <div className="w-full flex justify-end p-4">
        <Timer onTimeUp={submitQuiz} />
      </div>

      {/* Quiz heading */}
      <h2 className="text-2xl font-bold mb-6">
        Question {current + 1} of {questions.length}
      </h2>

      {/* Question card */}
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-xl font-semibold mb-4">
          {questions[current].question}
        </h3>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`px-4 py-2 rounded-lg border transition ${
                answers[current] === opt
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={prevQuestion}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-500 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {current < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitQuiz}
            className="px-4 py-2 bg-green-600 rounded-lg"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
