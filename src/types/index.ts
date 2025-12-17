export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  recommendedPrice: number;
  productCost: number;
  predictedProfit: number;
  profitGainLoss: number;
  demandChange: number;
  bpe: number;
  elasticity?: number;
}

export interface DashboardStats {
  opportunitiesFound: number;
  potentialProfitUplift: number;
  productsOptimized: number;
  averageElasticity: number;
}

export interface ProductData {
  billNumber: string;
  date: string;
  locationId: string;
  locationName: string;
  city: string;
  cost: number;
  brandName: string;
  orderType: string;
  billType: string;
  billingType: string;
  billStatus: string;
  areaName: string;
  platformName: string;
  itemId: string;
  itemName: string;
  posCode: string;
  defaultSalesPrice: number;
  aggregatorSalesPrice: number;
  category: string;
  parentCategory: string;
  modifierIds: string;
  modifierNames: string;
  itemTotalSalesPrice: number;
  itemDiscounts: number;
  itemCharges: number;
  itemTaxes: number;
  itemTotal: number;
}
