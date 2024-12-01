Segue o README revisado, agora com os comentários de código preservados:

---

# **README - Aplicativo React Native para Gestão de Produtos**

Este projeto é uma aplicação mobile desenvolvida em **React Native** utilizando o framework **Expo**. O objetivo principal é implementar autenticação, listagem, adição, edição e exclusão de produtos, explorando boas práticas de desenvolvimento, organização de código e integração com APIs.

---

## **Tecnologias Utilizadas**

- **Expo**: Gerenciamento e configuração do projeto.
- **Expo Router**: Navegação entre telas.
- **React Query**: Gerenciamento de dados e chamadas à API.
- **Axios**: Biblioteca para requisições HTTP.
- **Zustand**: Gerenciamento de estado global.
- **React Hook Form**: Criação e validação de formulários.
- **Gluestack UI**: Estilização e criação de tema global.

---

## **Instalação e Configuração**

### **Pré-requisitos**

- **Node.js** (versão 16 ou superior).
- **Yarn** ou **npm**.
- **Expo CLI** (instalável via `npm install -g expo-cli`).

### **Passo a passo**

1. Clone o repositório:

   ```bash
   git clone https://github.com/reciokaue/teste-tecnico.git
   cd teste-tecnico
   ```

2. Instale as dependências:

   ```bash
   yarn install
   # ou
   npm install
   ```

3. Inicie o projeto:

   ```bash
   expo start
   ```

4. Escaneie o QR Code exibido no terminal ou no navegador com o aplicativo **Expo Go**.

---

## **Estrutura de Pastas**

```plaintext
├── api/          # Funções para cada rota da API.
├── app/          # Telas do aplicativo.
├── components/   # Componentes reutilizáveis.
├── hooks/        # Hooks customizados.
```

### **Detalhes do `/app`**

```plaintext
├── (auth)/         # Fluxo de autenticação.
│   ├── _layout.tsx   # Stack navigator para autenticação.
│   ├── login.tsx     # Tela de login.
├── (tabs)/          # Fluxo principal com abas.
│   ├── (home)/
│   │   ├── _layout.tsx  # Tabs superiores.
│   │   ├── index.tsx    # Produtos masculinos.
│   │   ├── woman.tsx    # Produtos femininos.
│   ├── _layout.tsx      # Bottom tabs.
│   ├── config.tsx       # Tela de configurações.
├── product/         # Gerenciamento de produtos.
│   ├── (home)/
│   │   ├── [productId]/
│   │   │   ├── add.tsx   # Adicionar produto.
│   │   │   ├── edit.tsx  # Editar produto.
│   │   │   ├── delete.tsx # Excluir produto.
│   ├── _layout.tsx       # Stack navigator para produtos.
```

---

## **Principais Funcionalidades**

### **Home e`UseProducts`**

As telas de "Produtos Masculinos" e "Produtos Femininos" possuem a mesma lógica de requisição ao banco de dados. Por isso, foi criada a função `UseProducts`, que recebe as seguintes propriedades:

```typescript
interface UseProductsProps {
  categories: string[];
  key: string;
  pageSize?: number;
}
```

Essa função realiza múltiplas requisições usando `Promise.all`, embaralha os resultados e concatena os produtos anteriores. As categorias podem ser configuradas em `/app/(tabs)/home/_layout.tsx`.

#### Exemplo Simplificado: `/app/(tabs)/home/index.tsx`

na tela de home foi feito o uso do conceito de infinite scroll para melhorar a experiencia do
usuário e performance da aplicação

```typescript
<FlatList
  data={data?.products}        // Produtos retornados pelo UseProducts.
  onEndReached={() => refetch()} // Paginação infinita.
  renderItem={({ item: product }) => (
    <Link href={`/product/${product.id}`}>
      <ProductCard product={product} />
    </Link>
  )}
  ListFooterComponent={() => (
    isFetching && (
      <View className="pb-20 justify-center items-center">
        <ActivityIndicator size={32} />
      </View>
    )
  )}
/>
```

---

### **API**

As rotas da API foram abstraídas para simplificar mudanças futuras e facilitar testes. Veja um exemplo de abstração em `/api/get-products.tsx`:

aqui foram definidas as interfaces do produto, do que função recebe e qual o retorno dela, e também a logica de limit e skip da api for abstraída para page e pageSize

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
}

interface GetProductsData {
  category: string;
  page?: number;
  pageSize?: number;
}

export async function getProducts({
  category,
  page = 0,
  pageSize = 10,
}: GetProductsData) {
  const result = await api.get(`/products/category/${category}`, {
    params: {
      limit: pageSize,
      skip: page * pageSize, // Define a lógica de paginação.
    },
  });

  return result.data; // Retorna os dados formatados.
}
```

---

### **Adição de Produtos**

A adição de produtos ocorre em `/product/[productId]/add.tsx`. A categoria é determinada automaticamente com base na tela onde foi acionado pegando pelo slug e escolhendo uma categoria aleatória porque esta tela não possui input de categoria

```typescript
// Define a categoria de acordo com a aba ativa.
const category = productId === 'man'
  ? manCategories[Math.floor(Math.random() * manCategories.length)]
  : womanCategories[Math.floor(Math.random() * womanCategories.length)];
```

Após a inserção na API, o produto é adicionado ao cache do **React Query** como o primeiro item da lista:

```typescript
const { mutateAsync: handleAdd, isPending } = useMutation({
  mutationFn: (product) => addProduct({ ...product, category }), // Adiciona o produto à API.
  onSuccess: async (product) => {
    await queryClient.setQueryData(['products'], (prev) => ({
      ...prev,
      products: [product, ...prev.products], // Atualiza a lista com o novo produto.
    }));
    router.push('/(tabs)/(home)'); // Redireciona para a página inicial.
  },
});
```

---

### **Edição de Produtos**

A edição de produtos ocorre no componente `/components/edit-dialog.tsx`. A atualização é feita via `useMutation`, atualizando o estado da lista e do próprio produto, depois redireciona para home

```typescript
const { mutateAsync: handleEdit, isPending } = useMutation({
  mutationFn: () => editProduct(product), // Realiza a edição do produto na API.
  onSuccess: async () => {
    await queryClient.setQueryData(['products'], (prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === product.id ? { ...p, ...product } : p // Atualiza o produto editado.
      ),
    }));
    setIsOpen(false); // Fecha o modal de edição.
    router.replace('/(tabs)/(home)'); // Redireciona para a página inicial.
  },
});
```

---

### **Autenticação**

O gerenciamento de autenticação é feito com **Zustand**. O estado do usuário é persistido usando **AsyncStorage**, e a lógica está centralizada em `/hooks/useAuth.ts`:

```typescript
export const useAuthStore = create((set) => ({
  user: null,
  status: 'idle', // Idle aguarda a definição inicial.
  setUser: async (user) => {
    set({ user, status: 'signIn' }); // Define o usuário e altera o status.
    await AsyncStorage.setItem('user', JSON.stringify(user)); // Persiste o usuário.
  },
  logout: async () => {
    set({ user: null, status: 'signOut' }); // Remove o usuário.
    await AsyncStorage.removeItem('user'); // Limpa o armazenamento.
  },
  hydrate: async () => {
    const storage = await AsyncStorage.getItem('user');
    set({
      user: storage ? JSON.parse(storage) : null, // Restaura o usuário.
      status: storage ? 'signIn' : 'signOut', // Define o status inicial.
    });
  },
}));
```