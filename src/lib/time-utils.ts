export function getCurrentMeal(): string {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Breakfast: 8-9:30 AM weekdays & 8:30-10:30 AM weekends
  const breakfastStart = isWeekend ? 8.5 : 8; // 8:30 AM or 8:00 AM
  const breakfastEnd = isWeekend ? 10.5 : 9.5; // 10:30 AM or 9:30 AM
  
  // Lunch: 12:30-2 PM weekdays & 1-3 PM weekends  
  const lunchStart = isWeekend ? 13 : 12.5; // 1:00 PM or 12:30 PM
  const lunchEnd = isWeekend ? 15 : 14; // 3:00 PM or 2:00 PM
  
  // Dinner: 8-9:30 PM
  const dinnerStart = 20; // 8:00 PM
  const dinnerEnd = 21.5; // 9:30 PM
  
  const currentTime = currentHour + currentMinutes / 60;
  
  if (currentTime >= breakfastStart && currentTime < breakfastEnd) {
    return "breakfast";
  } else if (currentTime >= lunchStart && currentTime < lunchEnd) {
    return "lunch";
  } else if (currentTime >= 17.5 && currentTime < 18.5) {
    return "snacks"; // 5:30-6:30 PM
  } else if (currentTime >= dinnerStart && currentTime <= dinnerEnd) {
    return "dinner";
  } else {
    // Default logic based on proximity to meal times
    if (currentTime < breakfastStart) {
      return "breakfast";
    } else if (currentTime < lunchStart) {
      return "lunch"; 
    } else if (currentTime < 17.5) {
      return "snacks"; // After lunch until snacks time
    } else {
      return "dinner";
    }
  }
}

export function getCurrentTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

export function getMealTimeRange(meal: string): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const timeRanges = {
    breakfast: isWeekend ? "8:30 - 10:30 AM" : "8:00 - 9:30 AM",
    lunch: isWeekend ? "1:00 - 3:00 PM" : "12:30 - 2:00 PM",
    dinner: "8:00 - 9:30 PM",
    snacks: "5:30 - 6:30 PM"
  };
  
  return timeRanges[meal as keyof typeof timeRanges] || "";
}
