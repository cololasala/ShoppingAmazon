import { Product } from "@/types/product";

export const productMapper = (products: ProductResponse[]): Product[] => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      amountInStock: product.amount_in_stock,
      currentPrice: product.current_price,
      previousPrice: product.previous_price,
      deliveryPrice: product.delivery_price,
      deliveryInDays: product.delivery_in_days,
      isAmazonChoice: product.is_amazon_choice,
      imageUrl: product.image_url,
      model3DUrl: product.model_3d_url,
      user_id: product.user_id,
    };
  });
};

export interface ProductResponse {
  id: number;
  name: string;
  amount_in_stock: number;
  current_price: number;
  previous_price: number;
  delivery_price: number;
  delivery_in_days: number;
  is_amazon_choice: boolean;
  image_url: string;
  model_3d_url: string;
  user_id: string;
}
