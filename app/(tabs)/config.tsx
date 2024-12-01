import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Image, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/hooks/useAuth';
import { Text } from '@/components/ui/text';
import { LogoutDialog } from '@/components/logout-dialog';
import { StatusBar } from 'expo-status-bar';

export default function ConfigScreen() {
  const { user } = useAuthStore()

  // console.log(user)

  return (
    <View className='bg-blue-600 flex-1'>
      <StatusBar backgroundColor='#2563eb' style='light' translucent/>
      <View className='h-48 bg-blue-600 items-center'>
        <Image source={{uri: user?.image}} className='size-44 absolute -bottom-14 rounded-full border border-border z-10 bg-white'/>
      </View>
      <View className='flex-1  bg-white px-5 pt-20' style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <Heading className='text-black text-2xl text-center'>{user?.firstName}</Heading>
        <Text className='text-xl text-[#656565]'>{user?.email}</Text>
        
        <View className='gap-4 mt-8'>
          <Button variant='outline' className='w-full justify-start h-12 px-4'>
            <Feather name="user" size={24} color="#454545" />
            <ButtonText className='text-[#454545]'>Meus dados</ButtonText>
            <Feather name="chevron-right" size={24} color="#454545" className='ml-auto' />
          </Button>
          <Button variant='outline' className='w-full justify-start h-12 px-4'>
            <Feather name="bell" size={24} color="#454545" />
            <ButtonText className='text-[#454545]'>Notificações</ButtonText>
            <Feather name="chevron-right" size={24} color="#454545" className='ml-auto' />
          </Button>
          <Button variant='outline' className='w-full justify-start h-12 px-4'>
            <Feather name="book" size={24} color="#454545" />
            <ButtonText className='text-[#454545]'>Termos de uso</ButtonText>
            <Feather name="chevron-right" size={24} color="#454545" className='ml-auto' />
          </Button>

          <View className='mt-6'>
            <LogoutDialog/>
          </View>
        </View>
      </View>
    </View>
  );
}
