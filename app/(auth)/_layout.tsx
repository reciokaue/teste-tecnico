import { useAuthStore } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

export default function AuthenticationLayout() {
  const { status } = useAuthStore()

  if(status === 'signIn'){
    return <Redirect href={'/(tabs)/(home)'}/>
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false }} />
    </Stack>
  );
}
