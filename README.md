# GOL-PROJECT-FRONT — Essenciar: Game of Life

A React Native mobile app implementing Conway's Game of Life, built with the Essenciar stack.

## Stack

- **[Expo Router](https://expo.github.io/router)** — File-based navigation with tabs
- **[NativeWind](https://www.nativewind.dev/)** — Tailwind CSS for React Native
- **[Zustand](https://zustand-demo.pmnd.rs/)** — Lightweight state management
- **[Supabase](https://supabase.com/)** — Cloud sync and backend
- **[EAS](https://expo.dev/eas)** — Build and deploy with Expo Application Services

## Features

- 🔴 **Interactive Game Board** — Tap cells to toggle them alive/dead
- ▶️ **Play / Pause / Step** — Full simulation controls
- 🧬 **Built-in Patterns** — Glider, Blinker, Pulsar, Random
- ⚙️ **Settings** — Speed, grid size, grid lines, toroidal topology
- 💾 **Snapshots** — Save and restore game states
- ☁️ **Cloud Sync** — Optional Supabase integration

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase (optional)

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start the app

```bash
npm start
```

Scan the QR code with [Expo Go](https://expo.dev/go) or run on a simulator.

## Supabase Schema

Run this SQL in your Supabase project to enable cloud sync:

```sql
create table game_snapshots (
  id uuid default gen_random_uuid() primary key,
  grid text not null,
  generation integer not null,
  living_cells integer not null,
  settings text not null,
  created_at timestamptz default now()
);
```

## EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in
eas login

# Build for preview
eas build --profile preview --platform android

# Build for production
eas build --profile production --platform all
```

## Project Structure

```
app/
  _layout.tsx          # Root layout (dark theme)
  (tabs)/
    _layout.tsx        # Tab navigator
    index.tsx          # Game screen
    history.tsx        # Saved snapshots
    settings.tsx       # App settings
  +not-found.tsx

components/
  GameBoard.tsx        # Interactive grid
  GameControls.tsx     # Play/pause/reset/presets

store/
  gameStore.ts         # Zustand store (game state + logic)

hooks/
  useGameEngine.ts     # Simulation loop (setInterval)
  useSupabaseSync.ts   # Cloud sync hook

lib/
  supabase.ts          # Supabase client

constants/
  Colors.ts            # Color palette
```
