// Schema definitions for the static site
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  mealType: "breakfast" | "lunch" | "snacks" | "dinner";
  category: "main" | "side" | "beverage";
  isVegetarian: number;
  isVegan: number;
  isGlutenFree: number;
  isSpicy: number;
  calories: number;
  protein: string;
  dayOfWeek: string;
  ingredients: string;
  allergens: string;
}

export interface User {
  id: string;
  username: string;
  displayName?: string;
  email?: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

export type InsertUser = Omit<User, "id" | "createdAt">;
export type InsertMenuItem = Omit<MenuItem, "id">;