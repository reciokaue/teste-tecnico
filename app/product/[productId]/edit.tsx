import { ScrollView, Text, View } from "react-native";

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/get-product";
import { useLocalSearchParams } from "expo-router";
import { EditDialog } from "@/components/edit-dialog";
import { Input, InputField } from "@/components/ui/input";

const schema = z.object({
  id: z.number(),
  category: z.string(),
  title: z.string().min(3, 'Deve ter no mínimo 3 caracteres').max(40, 'Deve ter no máximo 40 caracteres'),
  description: z.string().min(3, 'Deve ter no mínimo 3 caracteres').max(255, 'Deve ter no máximo 255 caracteres'),
  price: z.string(),
  discountPercentage: z.string(),
  thumbnail: z.string(),
})
type EditProductType = z.infer<typeof schema>

export default function EditProductScreen() {
  const { productId } = useLocalSearchParams();

  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId: productId as string})
    
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EditProductType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: product?.id,
      category: product?.category,
      title: product?.title,
      description: product?.description,
      price: String(product?.price),
      discountPercentage: String(product?.discountPercentage),
      thumbnail: product?.thumbnail,
    }
  })

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="bg-white pt-8 px-5 pb-5 justify-between flex-1">
        <View className="gap-3 pb-10">
          <Controller
            control={control}
            name='title'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Nome</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.title !== undefined || false}
                  error={errors?.title?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </Input>
              </View>
            )}
          />
          <Controller
            control={control}
            name='description'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Descrição</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.description !== undefined || false}
                  error={errors?.description?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    multiline
                    numberOfLines={4}
                  />
                </Input>
              </View>
            )}
          />
          <Controller
            control={control}
            name='price'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Preço (R$)</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.price !== undefined || false}
                  error={errors?.price?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                  />
                </Input>
              </View>
            )}
          />
          <Controller
            control={control}
            name='discountPercentage'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Desconto (%)</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.discountPercentage !== undefined || false}
                  error={errors?.discountPercentage?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="numeric"
                  />
                </Input>
              </View>
            )}
          />
          <Controller
            control={control}
            name='thumbnail'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">URL da imagem</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.thumbnail !== undefined || false}
                  error={errors?.thumbnail?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    numberOfLines={1}
                  />
                </Input>
              </View>
            )}
          />
        </View>
        <EditDialog onPress={handleSubmit}/>
      </View>
    </ScrollView>
  );
};