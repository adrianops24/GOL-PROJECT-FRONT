import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "@/store/gameStore";
import * as Haptics from "expo-haptics";

const PRESETS = [
  { name: "Glider", pattern: "glider" },
  { name: "Blinker", pattern: "blinker" },
  { name: "Pulsar", pattern: "pulsar" },
  { name: "Random", pattern: "random" },
] as const;

type PresetName = (typeof PRESETS)[number]["pattern"];

export default function GameControls() {
  const { isRunning, toggleRunning, resetGame, stepForward, loadPreset } =
    useGameStore();

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleRunning();
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    resetGame();
  };

  const handleStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    stepForward();
  };

  return (
    <View className="mt-4">
      {/* Main controls */}
      <View className="flex-row justify-center gap-4 mb-4">
        <TouchableOpacity
          onPress={handleReset}
          className="bg-[#1a1a2e] p-4 rounded-full"
        >
          <Ionicons name="refresh" size={24} color="#e94560" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggle}
          className={`p-4 rounded-full ${
            isRunning ? "bg-[#e94560]" : "bg-green-500"
          }`}
          style={{ paddingHorizontal: 32 }}
        >
          <Ionicons
            name={isRunning ? "pause" : "play"}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleStep}
          disabled={isRunning}
          className={`bg-[#1a1a2e] p-4 rounded-full ${isRunning ? "opacity-40" : ""}`}
        >
          <Ionicons name="play-skip-forward" size={24} color="#4ade80" />
        </TouchableOpacity>
      </View>

      {/* Presets */}
      <View>
        <Text className="text-gray-400 text-xs mb-2 text-center">
          PATTERNS
        </Text>
        <View className="flex-row flex-wrap justify-center gap-2">
          {PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.pattern}
              onPress={() => {
                Haptics.selectionAsync();
                loadPreset(preset.pattern as PresetName);
              }}
              className="bg-[#1a1a2e] px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-sm">{preset.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
