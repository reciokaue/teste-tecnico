import { ProductCard } from '@/components/product-card';
import { UseProducts } from '@/hooks/useProducts';
import { Link } from 'expo-router';
import { ActivityIndicator, FlatList, View } from 'react-native';

const categories = [
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches'
];

export default function FemaleScreen() {
  const { data, refetch, isFetching } = UseProducts({
    categories, key: 'woman-products'
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
