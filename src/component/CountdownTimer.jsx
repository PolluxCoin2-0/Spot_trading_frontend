import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CountdownTimer = () => {
  const dataArray = useSelector((state) => state?.wallet?.dataObject);
  const [timeLeft, setTimeLeft] = useState(0);
  const [originalTimestamp, setOriginalTimestamp] = useState(null);

  useEffect(() => {
    // Check if dataArray is loaded and contains the timestamp
    if (dataArray && dataArray.length > 0 && dataArray[0]?.timestamp) {
      const timestampStr = dataArray[0].timestamp;
      const parsedTimestamp = Math.floor(new Date(timestampStr).getTime() / 1000); // Convert to seconds
      setOriginalTimestamp(parsedTimestamp);
    }
  }, [dataArray]); // Trigger this effect when dataArray updates

  useEffect(() => {
    // Exit if originalTimestamp hasn't been set
    if (originalTimestamp === null) return;

    // Calculate the target timestamp (48 hours later)
    const targetTimestamp = originalTimestamp + 172800;

    // Initialize time left
    const currentTime = Math.floor(Date.now() / 1000);
    const initialTimeLeft =
      targetTimestamp > currentTime ? targetTimestamp - currentTime : 0;
    setTimeLeft(initialTimeLeft);

    // Only start the timer if there's time left
    if (initialTimeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [originalTimestamp]); // Depend on originalTimestamp

  // Format time into hours, minutes, and seconds
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
            {dataArray[0].coolDown ? hours : "00"}
          </span>
        </div>
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl xl:text-7xl font-bold">
            {dataArray[0].coolDown ? minutes : '00'}
          </span>
        </div>
        <span className="text-5xl md:text-6xl xl:text-7xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl xl:text-7xl font-bold">
            {dataArray[0].coolDown ? seconds : '00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
