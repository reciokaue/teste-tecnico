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
import { useAuthStore } from "@/hooks/useAuth";
import { router } from "expo-router";

export function LogoutDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuthStore()

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const handleLogout = () => {
    logout()
    router.push('/(auth)/login')
  }

  return (
    <>
      <Button
        onPress={handleOpen}
        size="lg"
        variant="destructive"
      >
        <ButtonText size="sm">Sair da conta</ButtonText>
      </Button>
      <AlertDialog isOpen={isOpen} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className='gap-6'>
          <AlertDialogHeader>
            <Heading size="md">Sair da conta</Heading>
            <AlertDialogCloseButton >
              <Feather name="x" size={18} color="#8E8E8E" />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-gray-500">
              Você tem certeza que deseja sair da conta? 
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onPress={handleClose} variant="outline">
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={handleLogout}
              variant="destructive"
              className="w-24"
            > 
              <ButtonText>Sair</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};