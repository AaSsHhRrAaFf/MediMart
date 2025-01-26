import React, { useState, useEffect } from "react";

const LoadSpinner = ({ duration = 5 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 100 / (duration * 10);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-spin"
          style={{
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + progress / 2}% 0%, 100% ${
              progress
            }%, 100% 100%, 0% 100%, 0% ${progress}%, ${50 - progress / 2}% 0%)`,
          }}
        ></div>
        <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-lg font-bold text-purple-600 dark:text-purple-400">
          {Math.round(progress)}%
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 opacity-30 animate-pulse"></div>
      </div>
      <div
        className="mt-4 h-2 w-full max-w-xs bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default LoadSpinner;
