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
import { deleteProduct } from "@/api/delete-product";
import { router } from 'expo-router';
import { ActivityIndicator } from "react-native";

interface DeleteDialogProps {
  product?: Product
}

export function DeleteDialog({ product }: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  
  const { mutateAsync: handleDelete, isPending } = useMutation({
    mutationFn: () => deleteProduct({productId: product?.id}),
    onSuccess: async () => {
      const type = ['mens-shirts', 'mens-shoes', 'mens-watches']
      .includes(product?.category || '')? 'man-products': 'woman-products'
      
      await queryClient.setQueryData([type],
        ({products, ...rest}: GetProductsResponseData) => {
          return {
            ...rest,
            products: products.filter(pro =>
              pro.id !== product?.id
            )
          }
        } 
      )

      setIsOpen(false)
      
      router.replace(`/(tabs)/(home)${type === 'woman-products'? '/woman': ''}`);
    }
  })
  const handleClose = () => !isPending && setIsOpen(false)

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        disabled={!product}
        size="lg"
        variant="destructive"
      >
        <ButtonText size="sm">Excluir</ButtonText>
        <Feather name="trash" size={18} color="white" />
      </Button>
      <AlertDialog isOpen={isOpen} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className='gap-6'>
          <AlertDialogHeader>
            <Heading size="md">Excluir produto</Heading>
            <AlertDialogCloseButton >
              <Feather name="x" size={18} color="#8E8E8E" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-gray-500">
              Você tem certeza que deseja excluir esse produto? Essa ação não poderá ser desfeita.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" disabled={isPending}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={() => handleDelete()}
              variant="destructive"
              disabled={isPending}
              className="w-24"
            > 
              {isPending?
                <ActivityIndicator color='white'/>:
                <ButtonText>Excluir</ButtonText>
              }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};