import { getProducts, GetProductsResponseData } from '@/api/get-products';
import { ProductCard } from '@/components/product-card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, View } from 'react-native';

const categories = ['mens-shirts'];
const pageSize = 2;

export default function MaleScreen() {
  const queryClient = useQueryClient();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['man-products'],
    queryFn: async () => {
      const oldData: GetProductsResponseData =
        queryClient.getQueryData(['man-products']) || ({
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

  return (
    <View className='flex flex-1 justify-center items-center gap-2 bg-white'>
      <FlatList
        data={data?.products}
        numColumns={2}
        onEndReached={() => refetch()}
        onEndReachedThreshold={0.1}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 30
        }}
        renderItem={({item: product}) => 
          <Link
            className='py-0 h-fit -mt-4'
            href={`/product/${product.id}`} key={product.id}
            style={{width: '47%'}}
          >
            <ProductCard product={product}/>
          </Link>
        }
        ListFooterComponent={() => {
          if(isFetching) return (
            <View className='pb-20 justify-center items-center'>
              <ActivityIndicator size={32}/>
            </View>
          )
        }}
      />
    </View>
  );
}
