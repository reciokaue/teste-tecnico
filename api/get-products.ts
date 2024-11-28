import { api } from "./axios";

interface GetProductsData {
  category: string
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
  isDeleted: boolean
}

export interface GetProductsResponseData {
  total: number
  skip: number
  limit: number
  page: number
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

  return result.data as GetProductsResponseData
}