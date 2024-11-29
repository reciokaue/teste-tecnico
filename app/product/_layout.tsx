import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen name="[productId]/index" options={{headerTitle: '', headerShadowVisible: false }} />
      <Stack.Screen name="[productId]/edit" options={{headerTitle: 'Editar produto', headerShadowVisible: false }} />
      <Stack.Screen name="add" options={{headerTitle: 'Adicionar produto', headerShadowVisible: false }} />
    </Stack>
  );
}
