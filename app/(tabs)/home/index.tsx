import { getProducts } from '@/api/get-products';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function MaleScreen() {
  const { data: result } = useQuery({
    queryKey: ['user-forms'],
    queryFn: () => getProducts({ 
      category: 'mens-shirts',
     }),
  })

  return (
    <View className='flex flex-1 justify-center items-center gap-2'>
      <Text>Home</Text>
      <Link href={'/product-details'}>Product Details</Link>
      <Text>{JSON.stringify(result)}</Text>
    </View>
  );
}
