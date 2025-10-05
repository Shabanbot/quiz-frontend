import { useEffect, useState } from "react";

export default function Timer({ onTimeUp }) {
  const [time, setTime] = useState(60); // default 60 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp(); // Trigger quiz submission
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const progress = (time / 60) * 100; // for visual timer bar

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg font-bold">
        ⏱ Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      {/* Optional timer progress bar */}
      <div className="w-full h-2 bg-gray-300 rounded mt-2">
        <div
          className="h-2 bg-green-500 rounded"
          style={{ width: `${progress}%`, transition: "width 1s linear" }}
        ></div>
      </div>
    </div>
  );
}
