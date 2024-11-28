import { api } from "./axios";

interface DeleteProductData {
  productId?: number | string
}

export async function deleteProduct({
  productId
}: DeleteProductData){
  if(!productId)
    return

  await api.delete(`/products/${productId}`)
}