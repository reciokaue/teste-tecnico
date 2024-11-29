import { api } from "./axios";
import { Product } from "./get-products";

interface EditProductData {
  product: Partial<Product>
}

export async function editProduct({
  product
}: EditProductData){
  if(product?.id)
    return

  await api.put(`/products/${product.id}`, {
    body: JSON.stringify(product)
  })
}