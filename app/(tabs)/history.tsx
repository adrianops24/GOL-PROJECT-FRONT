import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useGameStore } from "@/store/gameStore";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen() {
  const { history, loadSnapshot, clearHistory } = useGameStore();

  const handleLoad = (index: number) => {
    Alert.alert(
      "Load Snapshot",
      "This will replace the current game state. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Load", onPress: () => loadSnapshot(index) },
      ]
    );
  };

  if (history.length === 0) {
    return (
      <View className="flex-1 bg-[#0a0a0a] items-center justify-center px-4">
        <Ionicons name="time-outline" size={64} color="#374151" />
        <Text className="text-gray-500 text-lg mt-4 text-center">
          No saved snapshots yet
        </Text>
        <Text className="text-gray-600 text-sm mt-2 text-center">
          Save a game state from the Game tab to see it here
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0a0a0a] px-4 pt-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-xl font-bold">Saved Snapshots</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Clear History", "Delete all saved snapshots?", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete All", style: "destructive", onPress: clearHistory },
            ])
          }
          className="p-2"
        >
          <Ionicons name="trash-outline" size={20} color="#e94560" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleLoad(index)}
            className="bg-[#1a1a2e] rounded-xl p-4 mb-3 flex-row justify-between items-center"
          >
            <View>
              <Text className="text-white font-semibold">
                Snapshot #{index + 1}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Generation {item.generation} · {item.livingCells} living cells
              </Text>
              <Text className="text-gray-600 text-xs mt-1">
                {new Date(item.savedAt).toLocaleString()}
              </Text>
            </View>
            <Ionicons name="play-circle-outline" size={32} color="#4ade80" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
