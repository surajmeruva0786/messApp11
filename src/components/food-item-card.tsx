import type { MenuItem } from "@shared/schema";

interface FoodItemCardProps {
  item: MenuItem;
}

export default function FoodItemCard({ item }: FoodItemCardProps) {
  
  const getStatusColor = () => {
    if (item.isSpicy) return "bg-orange-500";
    if (item.isVegan) return "bg-green-500";
    if (item.isVegetarian) return "bg-green-500";
    return "bg-gray-500";
  };

  const getStatusBadge = () => {
    if (item.isVegan) return { text: "Vegan", className: "bg-green-100 text-green-800" };
    if (item.isVegetarian) return { text: "Vegetarian", className: "bg-green-100 text-green-800" };
    if (item.isSpicy) return { text: "Spicy", className: "bg-orange-100 text-orange-800" };
    return { text: "Non-Veg", className: "bg-red-100 text-red-800" };
  };

  const badge = getStatusBadge();

  return (
    <div 
      className="food-card bg-card border border-border rounded-lg p-4"
      data-testid={`card-food-${item.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`w-3 h-3 ${getStatusColor()} rounded-full mr-2`}></span>
            <h3 className="font-semibold text-lg" data-testid={`text-food-name-${item.id}`}>
              {item.name}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm mb-2" data-testid={`text-food-description-${item.id}`}>
            {item.description}
          </p>
          <div className="flex items-center text-xs">
            <span className={`${badge.className} px-2 py-1 rounded-full`}>
              {badge.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
