import { getProduct } from "@/api/get-product";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, FlatList, Image, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { DeleteDialog } from "@/components/delete-dialog";

const width = Dimensions.get('window').width;

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();

  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId: productId as string})
  })

  const price = product && (product?.price * (100-product?.discountPercentage)/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  const discount = product && product?.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

  return (
    <View className="flex-1 bg-white">
      <View className="h-96 bg-gray-100">
        <FlatList
          data={product?.images}
          horizontal
          snapToAlignment="start"
          snapToInterval={width}
          scrollEventThrottle={0}
          decelerationRate={1}
          renderItem={({item: image}) => 
            <Image
              key={image}
              source={{uri: image}}
              resizeMode="contain"
              style={{width: width}}
            />
          }
        />
      </View>
      <View className="flex-1 justify-between p-5">
        <View className="space-y-2">
          <Heading size="xl">{product?.title}</Heading>
          <View className="flex-row items-end">
            <Heading size="md" className="text-[#B20000]">{price}
            </Heading>
            {product?.discountPercentage &&
              <Text size="sm" className="line-through ml-2">
                {discount}
              </Text>
            }
          </View>
          <Text size="sm">
            {product?.description}
          </Text>
        </View>

        <View className="gap-2">
          <Button size="lg" variant="primary">
            <ButtonText size="sm">Editar</ButtonText>
            <Feather name="edit" size={18} color="white" />
          </Button>
          <DeleteDialog product={product}/>
        </View>
      </View>
     </View>
  );
};