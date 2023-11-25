export type DessertFormValues = {
  name: string;
  products: { productId: string; quantity: number; caloricContent: number; }[];
  utilitiesPercent: number;
  profitPercent: number;
  quantityFromPortion?: number;
};
