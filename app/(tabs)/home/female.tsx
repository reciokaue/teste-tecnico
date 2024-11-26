import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Screen() {
  return (
    <View className='flex flex-1 justify-center items-center gap-2'>
      <Text>Woman products</Text>
      <Link href={'/product-details'}>Product Details</Link>
    </View>
  );
}
