import { getProducts, GetProductsResponseData } from '@/api/get-products';
import { ProductCard } from '@/components/product-card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

const categories = [
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches'
];

export default function FemaleScreen() {
  const [page, setPage] = useState(0)
  const queryClient = useQueryClient();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['woman-products'],
    queryFn: async () => {
      const pageSize = 2;
      const oldData: GetProductsResponseData =
        queryClient.getQueryData(['woman-products']) || ({} as any);

      if (categories.length * pageSize * page >= oldData?.total) return oldData;

      const results = await Promise.all(
        categories.map((category: string) =>
          getProducts({ category, page, pageSize })
        )
      );
      const products = results
        .flatMap((result) => result.products) 
        .sort(() => Math.random() - 0.5); 

      if (products.length > 0) setPage(page + 1);

      return {
        products: [...(oldData.products || []), ...products],
        total: results.reduce((sum, result) => sum + result.total, 0), 
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
          paddingHorizontal: 20,
          paddingVertical: 20
        }}
        renderItem={({item: product}) => 
          <Link
            className='py-0 h-fit -mt-4'
            href={'/product-details'} key={product.id}
            style={{width: '48%'}}
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
