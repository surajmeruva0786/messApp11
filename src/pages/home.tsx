import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import MealSelector from "@/components/meal-selector";
import FoodItemCard from "@/components/food-item-card";
import BottomNavigation from "@/components/bottom-navigation";
import WeeklyCalendar from "@/components/weekly-calendar";
import { useCurrentMeal } from "@/hooks/use-current-meal";
import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@/lib/schema";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [isWeeklyCalendarOpen, setIsWeeklyCalendarOpen] = useState(false);

  const { currentMeal, currentTime } = useCurrentMeal();
  const dayOfWeek = format(selectedDate, 'EEEE').toLowerCase();
  const activeMeal = selectedMeal || currentMeal;

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['/data/menu', dayOfWeek, activeMeal],
    queryFn: async () => {
      const response = await fetch(`/data/${dayOfWeek}-${activeMeal}.json`);
      if (!response.ok) throw new Error('Failed to fetch menu');
      return response.json() as Promise<MenuItem[]>;
    },
  });


  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const mainItems = menuItems.filter(item => item.category === 'main');
  const sideItems = menuItems.filter(item => item.category === 'side');
  const beverageItems = menuItems.filter(item => item.category === 'beverage');

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" data-testid="app-title">Mess Menu</h1>
            <p className="text-primary-foreground/80 text-sm" data-testid="current-date">
              {isToday ? 'Today' : format(selectedDate, 'EEEE')}, {format(selectedDate, 'MMM d, yyyy')}
            </p>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
            onClick={() => setIsWeeklyCalendarOpen(true)}
            data-testid="button-calendar"
          >
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Meal Selector */}
      <MealSelector
        currentMeal={currentMeal}
        selectedMeal={activeMeal}
        currentTime={currentTime}
        onMealChange={setSelectedMeal}
      />

      {/* Menu Items */}
      <main className="p-4 pb-20">
        <div className="mb-4">
          <h2 className="text-2xl font-bold flex items-center" data-testid="meal-title">
            <span className="w-2 h-8 bg-primary rounded-full mr-3"></span>
            <span>
              {isToday ? "Today's" : format(selectedDate, 'EEEE\'s')} {' '}
              {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)} Menu
            </span>
          </h2>
          <p className="text-muted-foreground mt-1">Fresh meals prepared with care</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-8" data-testid="no-items-message">
            <div className="text-muted-foreground mb-2">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">No menu available</p>
            <p className="text-sm text-muted-foreground">Menu for this time slot is not available yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main Course Items */}
            {mainItems.length > 0 && (
              <div className="space-y-3">
                {mainItems.map(item => (
                  <FoodItemCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            )}

            {/* Side Items */}
            {(sideItems.length > 0 || beverageItems.length > 0) && (
              <div>
                <h4 className="font-medium text-muted-foreground mb-3 text-sm uppercase tracking-wide">
                  Sides & Accompaniments
                </h4>
                <div className="space-y-3">
                  {sideItems.map(item => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                  {beverageItems.map(item => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      {/* Weekly Calendar Modal */}
      <WeeklyCalendar
        isOpen={isWeeklyCalendarOpen}
        onClose={() => setIsWeeklyCalendarOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}
