import { api } from "./axios";

interface GetProductsData {
  category:  'mens-shirts' | 'mens-shoes' | 'mens-watches'
  page?: number
  pageSize?: number
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  thumbnail: string
  images: string[]
}

interface ResponseData {
  total: number
  skip: number
  limit: number
  products: Product[]
}

export async function getProducts({
  category,
  page = 0,
  pageSize = 10,
}: GetProductsData){
  const limit = pageSize
  const skip = page * pageSize

  const result = await api.get(`/products/category/${category}`, {
    params: {
      limit, skip
    }
  })

  return result.data as ResponseData
}