
export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  currentPrice: number;
  oldPrice?: number;
  imageUrl: string;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  store: string;
  status?: string;
  priceHistory: PriceHistoryPoint[];
  sellers: Seller[];
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface Seller {
  name: string;
  price: number;
  shipping: string;
  url: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export enum AppView {
  Home = 'home',
  Search = 'search',
  Detail = 'detail',
  Profile = 'profile',
}
