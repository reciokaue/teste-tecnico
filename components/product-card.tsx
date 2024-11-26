import { Image, View } from "react-native";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Product } from "@/api/get-products";

interface ProductCardProps {
  product: Product
}

export function ProductCard({
  product
}: ProductCardProps) {
  const { title, description, thumbnail, discountPercentage, price } = product

  return (
    <Card variant="outline" className="rounded-2xl p-0 w-full">
       <Image
          source={{uri: thumbnail}}
          style={{height: 167.5, width: '100%'}} 
          resizeMode="contain"
        />
       <View className="border-t border-border p-2 space-y-2">
        <Heading size="sm">{title.slice(0, 15) + '...'}</Heading>
        <Text size="2xs">{description.slice(0, 100) + '...'}</Text>
        
        <View className="flex-row items-end mt-4">
          <Heading size="sm">
            {
              (price * (100-discountPercentage)/100)
              .toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            }
          </Heading>
          {discountPercentage &&
            <Text size="2xs" className="line-through ml-2">
              {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
            </Text>
          }
        </View>
       </View>
     </Card>
  );
};