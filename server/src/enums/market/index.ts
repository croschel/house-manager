export enum StatusList {
  ACTIVE = "active", // Market List can be used
  PROGRESS = "progress", // Someone has opened the list and using
  EXPIRED = "expired", // Past more than 30 days
  CLOSED = "closed", // Market List is cancelled
  DONE = "done", // Market List was used and now paid
}

export enum SupermarketSections {
  PRODUCE = "produce",
  DAIRY = "dairy",
  MEAT_POULTRY = "meat_poultry",
  SEAFOOD = "seafood",
  BAKERY = "bakery",
  FROZEN_FOODS = "frozen_foods",
  PANTRY_STAPLES = "pantry_staples",
  SNACKS_CONFECTIONERY = "snacks_confectionery",
  BEVERAGES = "beverages",
  HEALTH_WELLNESS = "health_wellness",
  HOUSEHOLD_ITEMS = "household_items",
  PERSONAL_CARE = "personal_care",
  BABY_PRODUCTS = "baby_products",
  PET_SUPPLIES = "pet_supplies",
  INTERNATIONAL_FOODS = "international_foods",
  ALCOHOL_TOBACCO = "alcohol_tobacco",
}
