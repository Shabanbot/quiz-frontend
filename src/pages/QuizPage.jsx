import { useState } from "react";
import Timer from "../components/Timer";

export default function QuizPage({ questions, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) {
    return <div className="flex items-center justify-center h-screen text-2xl">Loading questions...</div>;
  }

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitQuiz = () => {
    const formattedAnswers = {};
    Object.keys(answers).forEach((key) => {
      formattedAnswers[Number(key)] = answers[key];
    });
    onSubmit(formattedAnswers);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white px-6 relative w-full">
      {/* Timer */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <Timer onTimeUp={submitQuiz} />
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Question {current + 1} of {questions.length}
      </h2>

      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-xl font-semibold mb-4">{questions[current].question}</h3>

        <div className="flex flex-col gap-3">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`px-4 py-2 rounded-lg border transition ${
                answers[current] === opt ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={prevQuestion} disabled={current === 0} className="px-4 py-2 bg-gray-500 rounded-lg disabled:opacity-50">Previous</button>

        {current < questions.length - 1 ? (
          <button onClick={nextQuestion} className="px-4 py-2 bg-blue-600 rounded-lg">Next</button>
        ) : (
          <button onClick={submitQuiz} className="px-4 py-2 bg-green-600 rounded-lg">Submit</button>
        )}
      </div>
    </div>
  );
}

