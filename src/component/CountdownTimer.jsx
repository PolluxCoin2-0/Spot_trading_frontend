import { useEffect, useState } from 'react';

const CountdownTimer = () => {
  // Initial countdown time in seconds (48 hours)
  const initialTime = 48 * 60 * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the interval when component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex justify-center items-center space-x-4 p-4  text-white rounded-lg mt-16 mb-10">
      <div className="flex flex-col items-center">
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">{hours}</span>
        {/* <span className="text-sm">Hours</span> */}
      </div>
      <span className="text-5xl md:text-6xl xl:text-7xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">{minutes}</span>
        {/* <span className="text-sm">Minutes</span> */}
      </div>
      <span className="text-5xl md:text-6xl xl:text-7xl  font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">{seconds}</span>
        {/* <span className="text-sm">Seconds</span> */}
      </div>
    </div>
  );
};

export default CountdownTimer;
