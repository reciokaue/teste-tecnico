import { getProducts } from '@/api/get-products';
import { ProductCard } from '@/components/product-card';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

export default function MaleScreen() {
  const { data: result } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getProducts({ 
      category: 'mens-shirts',
     }),
  })

  return (
    <View className='flex flex-1 justify-center items-center gap-2 bg-white'>
      <FlatList
        data={result?.products}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          marginVertical: 20
        }}
        renderItem={({item: product}) => 
          <Link href={'/product-details'} key={product.id} style={{width: '48%'}}>
            <ProductCard product={product}/>
          </Link>
        }
      />
    </View>
  );
}
