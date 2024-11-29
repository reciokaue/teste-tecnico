import { api } from "./axios";
import { Product } from "./get-products";

interface AddProductData {
  product: {
    title: string
    description: string
    price: string
    discountPercentage: string
    thumbnail: string
    category: string
  }
}

export async function addProduct({
  product
}: AddProductData){
  const newProduct = {
    ...product,
    price: +product?.price,
    discountPercentage: +product?.discountPercentage,
  }

  const result = await api.post(`/products/add`, {
    body: JSON.stringify(newProduct)
  })
  return {
    id: result.data,
    ...newProduct,
    images: [newProduct.thumbnail]
  }  as Product
}