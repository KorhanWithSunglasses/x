
import { Product, Category, PriceHistoryPoint, Seller } from './types';

export const CATEGORIES: Category[] = [
  { id: 'elektronik', name: 'Elektronik', icon: 'devices', color: 'primary' },
  { id: 'moda', name: 'Moda', icon: 'checkroom', color: 'pink-500' },
  { id: 'ev-yasam', name: 'Ev & Yaşam', icon: 'chair', color: 'orange-500' },
  { id: 'supermarket', name: 'Süpermarket', icon: 'shopping_cart', color: 'green-500' },
  { id: 'spor', name: 'Spor', icon: 'fitness_center', color: 'blue-500' },
  { id: 'kozmetik', name: 'Kozmetik', icon: 'face', color: 'purple-500' },
];

const MOCK_PRICE_HISTORY: PriceHistoryPoint[] = [
  { date: '15 Eyl', price: 92000 },
  { date: '30 Eyl', price: 89000 },
  { date: '15 Eki', price: 91000 },
  { date: '30 Eki', price: 89499 },
  { date: '15 Kas', price: 88000 },
  { date: 'Bugün', price: 84999 },
];

const MOCK_SELLERS: Seller[] = [
  { name: 'Amazon', price: 84999, shipping: 'Ücretsiz', url: '#' },
  { name: 'Hepsiburada', price: 85250, shipping: 'Yarın Kapında', url: '#' },
  { name: 'Trendyol', price: 85400, shipping: 'Ücretsiz', url: '#' },
  { name: 'MediaMarkt', price: 86000, shipping: '+199 TL Kargo', url: '#' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Titanyum',
    category: 'Teknoloji',
    brand: 'Apple',
    currentPrice: 56250,
    oldPrice: 75000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiya8JvFS3XJ_izm1zbN4MzZXZf3_HOM7OFMPMuQLV4sgWtOjftwCzBYvd0uje7wzVncHCDQHpjXs-yXyon2KyrMuz0sgr1tjgmQxXgwRDkL72lvEjYylDoHCytd2WEKKbZcB60rXqQs1JL31e6yKZmPrEwIXw55oZCVNSZ2kEEX9koacelPq4XhyWW1ewNar-EAaNopk9ECWBhcGIyWjTqywOWBMYqeY4t3PRGEBgMtwMHJ3itEpdsFhUE0ZSg4aWGX32NLFJgLwY',
    discountPercentage: 25,
    rating: 4.8,
    reviewsCount: 1245,
    store: 'Amazon',
    priceHistory: MOCK_PRICE_HISTORY,
    sellers: MOCK_SELLERS
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    category: 'Ses',
    brand: 'Sony',
    currentPrice: 8400,
    oldPrice: 14000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJGPckVkqO7bWiiNYxCkGDuiSY31ARyAUMpeFeH-y0Q7Rot4uN8XPxrxn7ZInrf4tFSne-3wbW5oXhgqelKLoNGpmANiiDVQJFUuF_8STYvg2DmtMsa4qINmoni9V1wGa0dcRAwwsSZZpUnPRF67DQ-p4GxuIkU83j_-EhiA6OfSxPIm7qIwxIkKzbPDEKsmO10VJGAawFseQwPgU6GgmCUz0SLSki_EYBhxrSMum53aHbVfhrR250WriYS68BxFSdH1FG24l_wDiF',
    discountPercentage: 40,
    rating: 5.0,
    reviewsCount: 850,
    store: 'Trendyol',
    priceHistory: MOCK_PRICE_HISTORY,
    sellers: MOCK_SELLERS
  },
  {
    id: '3',
    name: 'Logitech G502 Hero Gaming Mouse',
    category: 'Teknoloji',
    brand: 'Logitech',
    currentPrice: 375,
    oldPrice: 2500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0qnk7yoEtLJD_2nSBO88YqbjF0XY6UHWLGD1nEkyhWvqM0uyFsGCpl1HWkUk_wHJnS2AeEEB7-28LQlSG5zfiebySEpYyVQcLpisyT4F9oQiZNzRO0ufMazs3kzlZAupxynLz0NYAoO9aNsfZ2_bddmbM3E-fFC87dCuSvmNOWmV9TdWmEaKqa0oo9-sYo6uMIY2RsDwaWXBprPHI4ZyFavFCgF9bkcnqImdO7GySgOpHyBhxgH-gvU6XIeZZRCXnS-GpGsGURPJS',
    discountPercentage: 85,
    rating: 4.7,
    reviewsCount: 2300,
    store: 'Hepsiburada',
    status: 'Tarihin en düşüğü',
    priceHistory: MOCK_PRICE_HISTORY,
    sellers: MOCK_SELLERS
  },
  {
    id: '4',
    name: 'JBL Tune 510BT Kulaklık',
    category: 'Ses',
    brand: 'JBL',
    currentPrice: 720,
    oldPrice: 1800,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Lbu-JWuTJjMz4aL2c3UU_40EbR6s96YQE5Ci4A89sWjmDrfrARndx4E8p7yFCekLCsZOsGK1blO9a5l_26sgXzIiBEtgA3z7QqLjCOtN8UHcD0bRa3o3qXInL2M8xeca_GWiKewd6jy57MIkER_BxWsGsg8p3VStFqoyfaK35PsNQe1a_9gvGhbhVt_VBPOtyNkNZu0r74hxbOzTVFKw34Dzlm0UETHUqrvMC8c37AAWE3aE5iXNxvQDUD1K_J2lgffU31hD6Dek',
    discountPercentage: 60,
    rating: 4.5,
    reviewsCount: 3200,
    store: 'Trendyol',
    status: 'Anlık düşüş',
    priceHistory: MOCK_PRICE_HISTORY,
    sellers: MOCK_SELLERS
  }
];
