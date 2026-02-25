# GOL-PROJECT-FRONT

Frontend mobile do meu projeto **Game of Life**, consumindo o backend do repositório **GOL-PROJECT** (Spring).

Este app foi inicializado com:

```bash
npx rn-new@latest Essenciar --expo-router --tabs --nativewind --zustand --supabase --eas
```

---

## Stack / Tecnologias

- **React Native + Expo**
- **Expo Router** (navegação baseada em rotas/arquivos)
- **Tabs** (template com navegação em abas)
- **NativeWind** (estilização com classes no estilo Tailwind)
- **Zustand** (gerenciamento de estado)
- **Supabase** (Auth/DB/Storage/Edge Functions, conforme necessidade)
- **EAS (Expo Application Services)** para build e deploy

---

## Objetivo do projeto

Construir um app mobile para simular e interagir com o **Conway’s Game of Life**, com recursos como:

- Visualização do grid e evolução das gerações
- Controles de simulação (play/pause/step/reset)
- Ajustes de regras/velocidade (opcional)
- Persistência/contas (via Supabase, se aplicável)
- Integração com API do backend Spring (**GOL-PROJECT**) para funcionalidades do domínio do projeto

---

## Requisitos

- **Node.js** (recomendado LTS)
- **npm** (ou yarn/pnpm)
- App **Expo Go** no celular (para rodar rapidamente)
- (Opcional) Android Studio / Xcode para emuladores/simuladores
- (Opcional) Conta e CLI do **EAS** para builds

---

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Rode no modo desenvolvimento (Expo):

```bash
npx expo start
```

Opções comuns:
- Pressione **a** para Android
- Pressione **i** para iOS (macOS)
- Escaneie o QR Code com o **Expo Go**

---

## Estrutura (visão geral)

> Pode variar conforme você evoluir o app, mas em geral com Expo Router você terá algo assim:

- `app/`  
  Rotas/telas do app (file-based routing)
- `app/(tabs)/`  
  Rotas agrupadas do layout com abas
- `components/`  
  Componentes reutilizáveis (grid, células, botões, etc.)
- `store/`  
  Stores do Zustand (estado do grid, simulação, settings)
- `lib/` ou `services/`  
  Integrações: Supabase client, API client, helpers
- `assets/`  
  Fontes/imagens

---

## Estado global (Zustand)

Sugestão de responsabilidades para o store:

- Grid atual (matriz/células)
- Execução da simulação (rodando/parado)
- Velocidade (intervalo)
- Geração atual
- Presets / padrões (opcional)
- Ações: toggleCell, randomize, clear, nextStep, start, stop...

---

## Estilos com NativeWind

O projeto usa **NativeWind** para estilização por classes.

Exemplo (bem simples):

```tsx
<View className="flex-1 items-center justify-center bg-zinc-950">
  <Text className="text-white text-lg font-bold">Game of Life</Text>
</View>
```

---

## Supabase

O Supabase pode ser usado para:
- Autenticação (email/senha, OAuth)
- Persistir configurações do usuário
- Salvar presets/boards
- Storage (se precisar)

Crie um arquivo de variáveis de ambiente (exemplo):

```bash
cp .env.example .env
```

E preencha com suas chaves (nomes podem variar conforme seu setup):

- `EXPO_PUBLIC_SUPABASE_URL=...`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY=...`

> Importante: no Expo, variáveis `EXPO_PUBLIC_` ficam disponíveis no app.

---

## Integração com o backend (Spring / GOL-PROJECT)

Este frontend foi pensado para consumir endpoints do seu backend em Spring (repo **GOL-PROJECT**).

Sugestão:
- Centralizar chamadas em `services/api.ts` (fetch/axios)
- Usar uma `BASE_URL` configurável por `.env`
- Tratar CORS/ambientes (dev, homolog, prod)

Exemplo de env:
- `EXPO_PUBLIC_API_URL=http://localhost:8080`

> Se você usa dispositivo físico, “localhost” será o próprio celular — normalmente você precisará usar o IP da sua máquina na rede.

---

## Builds com EAS

Login no EAS:

```bash
npx eas login
```

Configurar (gera `eas.json` se necessário):

```bash
npx eas build:configure
```

Build (exemplo Android):

```bash
npx eas build --platform android
```

---

## Roadmap (ideias)

- [ ] Implementar grid + regras do Game of Life
- [ ] Controles de simulação (play/pause/step)
- [ ] UI com NativeWind
- [ ] Persistência (Supabase) de presets e/ou usuário
- [ ] Integração com backend Spring (GOL-PROJECT)
- [ ] EAS build + release

---

## Licença

Defina aqui a licença do projeto (MIT, Apache-2.0, etc.) ou remova esta seção.
