import React from "react";

function ResultPage({ score }) {
  return (
    <div>
      <h2>Quiz Finished 🎉</h2>
      <p>Your Score: {score}</p>
    </div>
  );
}

export default ResultPage;
