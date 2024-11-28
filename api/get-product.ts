import { api } from "./axios";
import { Product } from "./get-products";

interface GetProductData {
  productId: number | string
}

export async function getProduct({
  productId
}: GetProductData){
  const result = await api.get(`/products/${productId}`)

  return result.data as Product
}