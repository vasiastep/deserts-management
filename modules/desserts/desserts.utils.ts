import { DessertModel } from '../../api/modules/desserts/dessert.model';
import { ProductModel } from '../../api/modules/products/product.model';

export const getPriceForProducts = (dessert: DessertModel) =>
  dessert.products.reduce(
    (acc, i) => acc + (i.product as ProductModel).price * i.quantity,
    0,
  );

export const getUtilityPrices = (dessert: DessertModel) =>
  (getPriceForProducts(dessert) * dessert.utilitiesPercent) / 100;

export const getFullPrice = (dessert: DessertModel) =>
  getPriceForProducts(dessert) * dessert.profitPercent +
  getUtilityPrices(dessert);

export const getPriceForTheItemFromPortion = (dessert: DessertModel) =>
  dessert.quantityFromPortion
    ? (getFullPrice(dessert) / dessert.quantityFromPortion).toFixed(1) + ' грн'
    : '-';
