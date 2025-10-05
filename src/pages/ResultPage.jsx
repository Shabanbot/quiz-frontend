export default function ResultPage({ results, onRestart }) {
  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        Loading results...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white px-6">
      <h1 className="text-4xl font-bold mb-6">Your Result</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Score: {results.score} / {results.total}
      </h2>

      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-xl">
        {results.details.map((detail, idx) => (
          <div key={idx} className="mb-4 border-b border-gray-300 pb-2">
            <p><strong>Q{idx + 1}:</strong> {detail.question}</p>
            <p><strong>Your Answer:</strong> {detail.userAnswer || "No answer"}</p>
            <p><strong>Correct Answer:</strong> {detail.correctAnswer}</p>
            <p className={detail.correct ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {detail.correct ? "Correct " : "Wrong ❌"}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-white text-black font-bold rounded-lg mt-6 hover:bg-gray-200"
      >
        Restart Quiz
      </button>
    </div>
  );
}
