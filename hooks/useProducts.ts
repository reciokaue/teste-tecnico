import { getProducts, GetProductsResponseData } from "@/api/get-products";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseProductsProps {
  categories: string[]
  key: string
  pageSize?: number
}

export const UseProducts = ({categories, key, pageSize = 2}: UseProductsProps) => {
  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const oldData: GetProductsResponseData =
        queryClient.getQueryData([key]) || ({
          total: 0,
          page: 0
        } as any);

      const { page, total } = oldData
      if (page != 0 && categories.length * pageSize * page >= total)
        return oldData;
      
      const results = await Promise.all(
        categories.map((category: string) =>
          getProducts({ category, page, pageSize })
        )
      );
      const products = results
        .flatMap((result) => result.products) 
        .sort(() => Math.random() - 0.5); 

      return {
        products: [...(oldData.products || []), ...products].filter(product => !product.isDeleted),
        total: results.reduce((sum, result) => sum + result.total, 0),
        page: products.length > 0? page + 1: page
      };
    },
  })

  return {
    ...products
  }
};