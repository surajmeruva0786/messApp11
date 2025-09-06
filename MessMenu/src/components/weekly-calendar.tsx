import { X } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@/lib/schema";

interface WeeklyCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

const daysOfWeek = [
  { name: 'Monday', key: 'monday' },
  { name: 'Tuesday', key: 'tuesday' },
  { name: 'Wednesday', key: 'wednesday' },
  { name: 'Thursday', key: 'thursday' },
  { name: 'Friday', key: 'friday' },
  { name: 'Saturday', key: 'saturday' },
  { name: 'Sunday', key: 'sunday' }
];

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

export default function WeeklyCalendar({ isOpen, onClose, selectedDate }: WeeklyCalendarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50" data-testid="modal-weekly-calendar">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-card rounded-xl w-full max-w-6xl max-h-[85vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
            <div>
              <h3 className="text-xl font-bold" data-testid="text-weekly-title">
                Weekly Menu - Ramanujan Mess
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete week's meal schedule
              </p>
            </div>
            <button 
              className="p-2 hover:bg-muted rounded-full transition-colors"
              onClick={onClose}
              data-testid="button-close-weekly"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {daysOfWeek.map((day) => (
                <DayColumn key={day.key} day={day} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DayColumn({ day }: { day: { name: string; key: string } }) {
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['/data/menu', day.key],
    queryFn: async () => {
      const response = await fetch(`/data/${day.key}.json`);
      if (!response.ok) throw new Error('Failed to fetch menu');
      return response.json() as Promise<MenuItem[]>;
    },
  });

  const getMealItems = (mealType: string) => {
    return menuItems.filter(item => item.mealType === mealType);
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4" data-testid={`day-column-${day.key}`}>
      <h4 className="font-bold text-lg mb-4 text-center border-b border-border pb-2">
        {day.name}
      </h4>
      
      {isLoading ? (
        <div className="space-y-4">
          {mealTypes.map((meal) => (
            <div key={meal} className="space-y-2">
              <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                {meal}
              </h5>
              <div className="space-y-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {mealTypes.map((mealType) => {
            const items = getMealItems(mealType);
            if (items.length === 0) return null;
            
            return (
              <div key={mealType} className="space-y-2">
                <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground border-l-2 border-primary pl-2">
                  {mealType}
                </h5>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="text-sm p-2 bg-card rounded border border-border/50"
                      data-testid={`weekly-item-${item.id}`}
                    >
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          item.isVegan ? 'bg-green-500' : 
                          item.isVegetarian ? 'bg-green-400' : 
                          'bg-red-500'
                        }`}></span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1 ml-4">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}