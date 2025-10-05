export default function LoginPage({ onStart }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 px-4">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to the Quiz App
        </h1>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

