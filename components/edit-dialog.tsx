import { useState } from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "./ui/alert-dialog"
import { Button, ButtonText } from "./ui/button";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { GetProductsResponseData, Product } from "@/api/get-products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "@/api/edit-product";
import { router } from 'expo-router';
import { ActivityIndicator } from "react-native";
import { manCategories } from "@/app/(tabs)/(home)/_layout";

interface EditDialogProps {
  onPress: any
}

export function EditDialog({ onPress }: EditDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<Product>()
  const queryClient = useQueryClient()
  
  const { mutateAsync: handleEdit, isPending } = useMutation({
    mutationFn: () => editProduct({ product: product || {} }),
    onSuccess: async () => {
      const type = manCategories.includes(product?.category || '')? 'man-products': 'woman-products'
      
      await queryClient.setQueryData([type],
        ({products, ...rest}: GetProductsResponseData) => {
          return {
            ...rest,
            products: products.map(pro =>
              pro.id !== product?.id? pro: {
                ...pro,
                ...product,
              }
            )
          }
        } 
      )
      await queryClient.setQueryData(['product', String(product?.id)],
        (pro: Product) => ({
          ...pro,
          ...product,
        })
      )
      setIsOpen(false)
      router.replace(`/(tabs)/(home)${type === 'woman-products'? '/woman': ''}`);
    },
  })
  const handleClose = () => !isPending && setIsOpen(false)

  const handleOpen = (data: any) => {
    setProduct(data)
    setIsOpen(true)
  }

  return (
    <>
      <Button
        onPress={onPress(handleOpen)}
        size="lg"
        variant="primary"
      >
        <ButtonText size="sm">Salvar</ButtonText>
      </Button>
      <AlertDialog isOpen={isOpen} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className='gap-6'>
          <AlertDialogHeader>
            <Heading size="md">Editar produto</Heading>
            <AlertDialogCloseButton >
              <Feather name="x" size={18} color="#8E8E8E" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-gray-500">
            Você tem certeza que deseja editar esse produto? Essa ação não poderá ser desfeita.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onPress={handleClose} variant="outline" disabled={isPending}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={() => handleEdit()}
              variant="primary"
              disabled={isPending}
              className="w-24"
            > 
              {isPending?
                <ActivityIndicator color='white'/>:
                <ButtonText>Salvar</ButtonText>
              }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};