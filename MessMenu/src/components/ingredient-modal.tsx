import { X } from "lucide-react";
import type { MenuItem, Ingredient } from "@shared/schema";

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodItem: MenuItem | null;
}

export default function IngredientModal({ isOpen, onClose, foodItem }: IngredientModalProps) {
  if (!isOpen || !foodItem) return null;

  const ingredients = typeof foodItem.ingredients === 'string' 
    ? JSON.parse(foodItem.ingredients) as Ingredient[] 
    : foodItem.ingredients as Ingredient[];
  const allergens = typeof foodItem.allergens === 'string' 
    ? JSON.parse(foodItem.allergens) as string[]
    : foodItem.allergens as string[];

  const getAllergenBadges = () => {
    const badges = [];
    if (foodItem.isGlutenFree) badges.push("Gluten-Free");
    if (foodItem.isVegan) badges.push("Vegan");
    if (foodItem.isVegetarian && !foodItem.isVegan) badges.push("Vegetarian");
    if (!allergens.includes("dairy")) badges.push("Dairy-Free");
    return badges;
  };

  return (
    <div className="ingredient-modal fixed inset-0 bg-black/50 z-50" data-testid="modal-ingredients">
      <div className="flex items-end justify-center min-h-screen p-4">
        <div className="slide-up bg-card rounded-t-xl w-full max-w-md max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
            <div>
              <h3 className="text-lg font-semibold" data-testid="text-modal-food-name">
                {foodItem.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-modal-food-description">
                {foodItem.description}
              </p>
            </div>
            <button 
              className="p-2 hover:bg-muted rounded-full transition-colors"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-4 overflow-y-auto max-h-96">
            {/* Nutritional Info */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Nutritional Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-calories">
                    {foodItem.calories || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-protein">
                    {foodItem.protein || "0g"}
                  </div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Ingredients</h4>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-2 bg-muted/30 rounded-lg"
                    data-testid={`ingredient-${index}`}
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="flex-1">{ingredient.name}</span>
                    <span className="text-sm text-muted-foreground">{ingredient.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergen Information */}
            <div className="mb-4">
              <h4 className="font-semibold mb-3">Allergen Information</h4>
              <div className="flex flex-wrap gap-2">
                {getAllergenBadges().map((badge, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                    data-testid={`badge-allergen-${index}`}
                  >
                    {badge}
                  </span>
                ))}
                {allergens.length > 0 && allergens.map((allergen, index) => (
                  <span 
                    key={`allergen-${index}`}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                    data-testid={`badge-contains-${index}`}
                  >
                    Contains {allergen}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
