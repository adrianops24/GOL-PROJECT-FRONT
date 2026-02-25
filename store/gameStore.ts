import { create } from "zustand";

type Grid = boolean[][];

export interface GameSettings {
  rows: number;
  cols: number;
  speed: number;
  showGrid: boolean;
  wrapEdges: boolean;
}

export interface Snapshot {
  grid: Grid;
  generation: number;
  livingCells: number;
  savedAt: number;
}

type Preset = "glider" | "blinker" | "pulsar" | "random";

interface GameState {
  grid: Grid;
  generation: number;
  livingCells: number;
  isRunning: boolean;
  settings: GameSettings;
  history: Snapshot[];

  // Actions
  toggleCell: (row: number, col: number) => void;
  toggleRunning: () => void;
  resetGame: () => void;
  stepForward: () => void;
  updateSettings: (partial: Partial<GameSettings>) => void;
  saveSnapshot: () => void;
  loadSnapshot: (index: number) => void;
  clearHistory: () => void;
  loadPreset: (preset: Preset) => void;
  tick: () => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  rows: 30,
  cols: 30,
  speed: 200,
  showGrid: true,
  wrapEdges: true,
};

function createEmptyGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

function countLiving(grid: Grid): number {
  return grid.reduce(
    (sum, row) => sum + row.filter(Boolean).length,
    0
  );
}

function computeNextGeneration(grid: Grid, settings: GameSettings): Grid {
  const { rows, cols, wrapEdges } = settings;
  return grid.map((row, r) =>
    row.map((cell, c) => {
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          let nr = r + dr;
          let nc = c + dc;
          if (wrapEdges) {
            nr = (nr + rows) % rows;
            nc = (nc + cols) % cols;
          } else {
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          }
          if (grid[nr][nc]) neighbors++;
        }
      }
      return neighbors === 3 || (cell && neighbors === 2);
    })
  );
}

function placePattern(
  grid: Grid,
  pattern: boolean[][],
  startRow: number,
  startCol: number
): Grid {
  const newGrid = grid.map((r) => [...r]);
  pattern.forEach((row, dr) => {
    row.forEach((cell, dc) => {
      const r = startRow + dr;
      const c = startCol + dc;
      if (r >= 0 && r < newGrid.length && c >= 0 && c < newGrid[0].length) {
        newGrid[r][c] = cell;
      }
    });
  });
  return newGrid;
}

const PATTERNS: Record<Preset, boolean[][]> = {
  glider: [
    [false, true, false],
    [false, false, true],
    [true, true, true],
  ],
  blinker: [[true, true, true]],
  pulsar: [
    [false,false,true,true,true,false,false,false,true,true,true,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [false,false,true,true,true,false,false,false,true,true,true,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,true,true,true,false,false,false,true,true,true,false,false],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [true,false,false,false,false,true,false,true,false,false,false,false,true],
    [false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,true,true,true,false,false,false,true,true,true,false,false],
  ],
  random: [],
};

export const useGameStore = create<GameState>((set, get) => ({
  grid: createEmptyGrid(DEFAULT_SETTINGS.rows, DEFAULT_SETTINGS.cols),
  generation: 0,
  livingCells: 0,
  isRunning: false,
  settings: DEFAULT_SETTINGS,
  history: [],

  toggleCell: (row, col) =>
    set((state) => {
      const newGrid = state.grid.map((r) => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return { grid: newGrid, livingCells: countLiving(newGrid) };
    }),

  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),

  resetGame: () =>
    set((state) => ({
      grid: createEmptyGrid(state.settings.rows, state.settings.cols),
      generation: 0,
      livingCells: 0,
      isRunning: false,
    })),

  stepForward: () =>
    set((state) => {
      const newGrid = computeNextGeneration(state.grid, state.settings);
      return {
        grid: newGrid,
        generation: state.generation + 1,
        livingCells: countLiving(newGrid),
      };
    }),

  tick: () =>
    set((state) => {
      if (!state.isRunning) return state;
      const newGrid = computeNextGeneration(state.grid, state.settings);
      return {
        grid: newGrid,
        generation: state.generation + 1,
        livingCells: countLiving(newGrid),
      };
    }),

  updateSettings: (partial) =>
    set((state) => ({
      settings: { ...state.settings, ...partial },
    })),

  saveSnapshot: () =>
    set((state) => {
      const snapshot: Snapshot = {
        grid: state.grid.map((r) => [...r]),
        generation: state.generation,
        livingCells: state.livingCells,
        savedAt: Date.now(),
      };
      return { history: [snapshot, ...state.history].slice(0, 20) };
    }),

  loadSnapshot: (index) =>
    set((state) => {
      const snapshot = state.history[index];
      if (!snapshot) return state;
      return {
        grid: snapshot.grid.map((r) => [...r]),
        generation: snapshot.generation,
        livingCells: snapshot.livingCells,
        isRunning: false,
      };
    }),

  clearHistory: () => set({ history: [] }),

  loadPreset: (preset) =>
    set((state) => {
      const { rows, cols } = state.settings;
      let newGrid: Grid;

      if (preset === "random") {
        newGrid = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => Math.random() < 0.3)
        );
      } else {
        newGrid = createEmptyGrid(rows, cols);
        const pattern = PATTERNS[preset];
        const startRow = Math.floor((rows - pattern.length) / 2);
        const startCol = Math.floor((cols - (pattern[0]?.length ?? 0)) / 2);
        newGrid = placePattern(newGrid, pattern, startRow, startCol);
      }

      return {
        grid: newGrid,
        generation: 0,
        livingCells: countLiving(newGrid),
        isRunning: false,
      };
    }),
}));
