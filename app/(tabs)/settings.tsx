import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useGameStore } from "@/store/gameStore";
import { useSupabaseSync } from "@/hooks/useSupabaseSync";

export default function SettingsScreen() {
  const { settings, updateSettings, resetGame, saveSnapshot } = useGameStore();
  const { syncing, syncToCloud, isConnected } = useSupabaseSync();

  const speeds = [
    { label: "Slow", value: 500 },
    { label: "Normal", value: 200 },
    { label: "Fast", value: 80 },
    { label: "Blazing", value: 30 },
  ];

  const gridSizes = [
    { label: "Small (20×20)", rows: 20, cols: 20 },
    { label: "Medium (30×30)", rows: 30, cols: 30 },
    { label: "Large (40×40)", rows: 40, cols: 40 },
  ];

  return (
    <ScrollView className="flex-1 bg-[#0a0a0a]">
      <View className="px-4 pt-4 pb-8">
        <Text className="text-white text-xl font-bold mb-4">Settings</Text>

        {/* Speed */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <Text className="text-white font-semibold mb-3">Simulation Speed</Text>
          <View className="flex-row flex-wrap gap-2">
            {speeds.map((s) => (
              <TouchableOpacity
                key={s.value}
                onPress={() => updateSettings({ speed: s.value })}
                className={`px-4 py-2 rounded-lg ${
                  settings.speed === s.value ? "bg-green-500" : "bg-[#0f3460]"
                }`}
              >
                <Text className="text-white font-medium">{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Grid Size */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <Text className="text-white font-semibold mb-3">Grid Size</Text>
          {gridSizes.map((g) => (
            <TouchableOpacity
              key={g.label}
              onPress={() => {
                updateSettings({ rows: g.rows, cols: g.cols });
                resetGame();
              }}
              className={`p-3 rounded-lg mb-2 flex-row justify-between items-center ${
                settings.rows === g.rows ? "bg-green-500/20 border border-green-500" : "bg-[#0f3460]"
              }`}
            >
              <Text className="text-white">{g.label}</Text>
              {settings.rows === g.rows && (
                <Text className="text-green-400">✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Show Grid Lines */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white font-semibold">Show Grid Lines</Text>
              <Text className="text-gray-400 text-sm">Display cell borders</Text>
            </View>
            <Switch
              value={settings.showGrid}
              onValueChange={(v) => updateSettings({ showGrid: v })}
              trackColor={{ false: "#374151", true: "#4ade80" }}
              thumbColor={settings.showGrid ? "#fff" : "#9ca3af"}
            />
          </View>
        </View>

        {/* Wrap Edges */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white font-semibold">Wrap Edges</Text>
              <Text className="text-gray-400 text-sm">Toroidal grid topology</Text>
            </View>
            <Switch
              value={settings.wrapEdges}
              onValueChange={(v) => updateSettings({ wrapEdges: v })}
              trackColor={{ false: "#374151", true: "#4ade80" }}
              thumbColor={settings.wrapEdges ? "#fff" : "#9ca3af"}
            />
          </View>
        </View>

        {/* Cloud Sync */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <Text className="text-white font-semibold mb-1">Cloud Sync</Text>
          <Text className="text-gray-400 text-sm mb-3">
            {isConnected ? "Connected to Supabase" : "Supabase not configured"}
          </Text>
          <TouchableOpacity
            onPress={syncToCloud}
            disabled={syncing || !isConnected}
            className={`p-3 rounded-lg items-center ${
              syncing || !isConnected ? "bg-gray-700" : "bg-[#0f3460]"
            }`}
          >
            <Text className="text-white font-medium">
              {syncing ? "Syncing..." : "Sync to Cloud"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View className="bg-[#1a1a2e] rounded-xl p-4 mb-4">
          <Text className="text-white font-semibold mb-3">Actions</Text>
          <TouchableOpacity
            onPress={saveSnapshot}
            className="bg-[#0f3460] p-3 rounded-lg items-center mb-2"
          >
            <Text className="text-white font-medium">Save Current Snapshot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Reset Game", "Clear the board and start over?", [
                { text: "Cancel", style: "cancel" },
                { text: "Reset", style: "destructive", onPress: resetGame },
              ])
            }
            className="bg-[#e94560]/20 border border-[#e94560] p-3 rounded-lg items-center"
          >
            <Text className="text-[#e94560] font-medium">Reset Game</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-600 text-xs text-center">
          Essenciar · Game of Life v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}
