interface MealSelectorProps {
  currentMeal: string;
  selectedMeal: string;
  currentTime: string;
  onMealChange: (meal: string) => void;
}

const getMealTimes = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  return {
    breakfast: isWeekend ? "8:30 - 10:30 AM" : "8:00 - 9:30 AM",
    lunch: isWeekend ? "1:00 - 3:00 PM" : "12:30 - 2:00 PM",
    snacks: "5:30 - 6:30 PM",
    dinner: "8:00 - 9:30 PM"
  };
};

export default function MealSelector({ 
  currentMeal, 
  selectedMeal, 
  currentTime, 
  onMealChange 
}: MealSelectorProps) {
  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      {/* Current Time Display */}
      <div className="px-4 py-3 bg-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Time</p>
            <p className="font-semibold text-lg" data-testid="current-time">{currentTime}</p>
          </div>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            <span data-testid="current-meal-indicator">
              {currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)} Time
            </span>
          </div>
        </div>
      </div>
      
      {/* Meal Navigation */}
      <div className="flex bg-card">
        {Object.entries(getMealTimes()).map(([meal, time]) => (
          <button
            key={meal}
            className={`meal-indicator ${selectedMeal === meal ? 'active' : ''} flex-1 py-3 px-4 text-center transition-colors hover:bg-muted/50 ${
              selectedMeal === meal ? 'bg-muted' : ''
            }`}
            onClick={() => onMealChange(meal)}
            data-testid={`button-meal-${meal}`}
          >
            <div className={`text-sm font-medium ${
              selectedMeal === meal ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </div>
            <div className="text-xs text-muted-foreground">{time}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
