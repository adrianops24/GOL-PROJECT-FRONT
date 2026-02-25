import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useGameStore } from "@/store/gameStore";

export function useSupabaseSync() {
  const [syncing, setSyncing] = useState(false);
  const { grid, generation, livingCells, settings } = useGameStore();

  const syncToCloud = async () => {
    if (!isSupabaseConfigured) return;
    setSyncing(true);
    try {
      await supabase.from("game_snapshots").insert({
        grid: JSON.stringify(grid),
        generation,
        living_cells: livingCells,
        settings: JSON.stringify(settings),
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncing,
    syncToCloud,
    isConnected: isSupabaseConfigured,
  };
}
