type BasicInfo = {
  supermercado: string;
  product_name: string;
  product_url: string;
  prices: Price[];
  img_url?: string;
};

type Price = {
  price_id: string;
  product_id: string;
  list_price: string; // Or number if you handle it as a numeric value
  discounted_price: string | null; // Or number if you handle it as a numeric value
  created_at: string; // Or Date if you plan to convert string to Date object
};

type Product = {
  product_id: string;
  supermercado: string;
  product_name: string;
  product_url: string;
  img_url: string;
  slug: string;
  brand: string | null;
  created_at: string; // Or Date if you plan to convert string to Date object
  prices: Price[];
};

export type { Product, Price, BasicInfo };
