import { ScrollView, Text, View } from "react-native";

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { manCategories, womanCategories } from "@/app/(tabs)/(home)/_layout";
import { addProduct } from "@/api/add-product";
import { GetProductsResponseData, Product } from "@/api/get-products";

const schema = z.object({
  title: z.string().min(3, 'Deve ter no mínimo 3 caracteres').max(40, 'Deve ter no máximo 40 caracteres'),
  description: z.string().min(3, 'Deve ter no mínimo 3 caracteres').max(255, 'Deve ter no máximo 255 caracteres'),
  price: z.string(),
  discountPercentage: z.string(),
  thumbnail: z.string(),
})
type AddProductType = z.infer<typeof schema>

export default function AddProductScreen() {
  const { productId } = useLocalSearchParams();
  const queryClient = useQueryClient()

  const category = productId === 'man'
  ? manCategories[Math.floor(Math.random() * manCategories.length)]
  : womanCategories[Math.floor(Math.random() * womanCategories.length)]

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddProductType>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: handleAdd, isPending } = useMutation({
    mutationFn: (product: any) => addProduct({ product: {...product, category} }),
    onSuccess: async (product) => {
      const type = productId === 'man'? 'man-products': 'woman-products'

      await queryClient.setQueryData([type],
        ({products, ...rest}: GetProductsResponseData) => {
          return {
            ...rest,
            products: [
              product,
              ...products
            ]
          }
        } 
      )
      await queryClient.setQueryData(['product', String(product?.id)],
        () => (product)
      )
      router.replace(`/(tabs)/(home)`);
    },
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
        <Button
          onPress={handleSubmit(handleAdd)}
          variant="primary"
          disabled={isPending}
        >
          <ButtonText>
            Salvar
          </ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};