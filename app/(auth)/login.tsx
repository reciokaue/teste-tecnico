import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { z } from "zod";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";
import { router } from "expo-router";

const schema = z.object({
  username: z.string(),
  password: z.string()
})
type LoginType = z.infer<typeof schema>

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { setUser } = useAuthStore()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: ({ username, password }: LoginType) => login({ username, password }),
    onSuccess: (user) => {
      setUser(user)
      router.push('/(tabs)/(home)')
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: LoginType){
    mutateAsync(data)
  }

  return (
    <View>
      <StatusBar style="light" translucent backgroundColor='#2563eb'/>
      <View className="flex bg-blue-600 px-8 h-1/2 items-center justify-center">
        <Heading size="2xl" className="text-typography-0 mb-3 text-center">
          Bem-vindo de volta!
        </Heading>
        <Text size="md" className="text-typography-0 text-center">
          Insira seus dados para entrar na sua conta.
        </Text>

      </View>
      <View className="flex bg-white px-8 h-1/2 relative">
        <View className="px-6 py-12 gap-6 bg-white rounded-lg border border-border -top-28">
          {error && 
            <Text size="md" className="text-error-700 text-center">
              Username ou senha inválidos
            </Text>
          }
          <Controller
            control={control}
            name='username'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Username</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.username !== undefined || false}
                  error={errors?.username?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    numberOfLines={1}
                    autoCapitalize="none"
                  />
                </Input>
              </View>
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({field}) => (
              <View>
                <Text className="text-base font-medium mb-2">Senha</Text>
                <Input
                  variant="outline"
                  isInvalid={errors?.password !== undefined || false}
                  error={errors?.password?.message}
                >
                  <InputField
                    value={field.value}
                    onChangeText={field.onChange}
                    numberOfLines={1}
                    type={isPasswordVisible? 'text': 'password'}
                    autoCapitalize="none"
                  />
                  <InputSlot onPress={() => setIsPasswordVisible(prev => !prev)} className="p-3">
                    {isPasswordVisible?
                      <Feather name="eye" size={14} color="#747474" />:
                      <Feather name="eye-off" size={14} color="#747474" />
                    }
                  </InputSlot>
                </Input>
              </View>
            )}
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={isPending}
          >
            {isPending ?
              <ActivityIndicator size={24} color='white'/>:
              <ButtonText>Entrar</ButtonText>
            }
          </Button>
        </View>
      </View>
    </View>
  );
};