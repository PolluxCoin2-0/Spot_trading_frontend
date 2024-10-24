import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CountdownTimer = () => {
  const dataArray = useSelector((state) => state?.wallet?.dataObject);
  console.log({ ss: dataArray[0][6] });

  // Extract the timestamp indicating when 48 hours is completed
  const timestampHex = dataArray[0][6] || 0;
  // console.log(Number(dataArray[0][6]));

  const originalTimestamp = timestampHex ? Number(timestampHex) : 0; // Convert from hex to number

  // Add 48 hours (172,800 seconds) to the target timestamp
  const targetTimestamp = originalTimestamp + 172800;

  // Get the current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Calculate the time left (in seconds) until the target timestamp
  const initialTime =
    targetTimestamp > currentTime ? targetTimestamp - currentTime : 0;

  // State to hold the remaining time
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Update timeLeft when the targetTimestamp changes
    setTimeLeft(initialTime);

    // If there's no time left, don't start the timer
    if (initialTime === 0) return;

    // Start the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [initialTime, dataArray]); // Depend on initialTime

  // Convert seconds to hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center space-x-4 p-4 text-white rounded-lg mt-16 mb-10">
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl xl:text-7xl font-bold">
            {hours}
          </span>
        </div>
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl xl:text-7xl font-bold">
            {minutes}
          </span>
        </div>
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl xl:text-7xl font-bold">
            {seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
