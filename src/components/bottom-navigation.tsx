import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";

interface BottomNavigationProps {
  selectedDate: Date;
  onDateChange: (direction: 'prev' | 'next') => void;
}

export default function BottomNavigation({ selectedDate, onDateChange }: BottomNavigationProps) {
  const getDateLabel = (date: Date, offset: number) => {
    const targetDate = new Date(date);
    targetDate.setDate(date.getDate() + offset);
    
    if (isToday(targetDate)) return "Today";
    if (isYesterday(targetDate)) return "Yesterday";
    if (isTomorrow(targetDate)) return "Tomorrow";
    return format(targetDate, "MMM d");
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onDateChange('prev')}
          data-testid="button-previous-day"
        >
          <ChevronLeft className="w-5 h-5 mb-1" />
          <span className="text-xs">{getDateLabel(selectedDate, -1)}</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-muted rounded-full"></div>
        </div>
        
        <button 
          className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onDateChange('next')}
          data-testid="button-next-day"
        >
          <ChevronRight className="w-5 h-5 mb-1" />
          <span className="text-xs">{getDateLabel(selectedDate, 1)}</span>
        </button>
      </div>
    </div>
  );
}
