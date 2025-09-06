import { useState, useEffect } from "react";
import { getCurrentMeal, getCurrentTime } from "@/lib/time-utils";

export function useCurrentMeal() {
  const [currentMeal, setCurrentMeal] = useState(getCurrentMeal());
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => {
      setCurrentMeal(getCurrentMeal());
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { currentMeal, currentTime };
}
