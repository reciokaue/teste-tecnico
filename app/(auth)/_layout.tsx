import { Stack } from 'expo-router';

export default function AuthenticationLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown: false }} />
    </Stack>
  );
}
