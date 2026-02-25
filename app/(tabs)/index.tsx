import { View, Text, ScrollView, Dimensions } from "react-native";
import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import { useGameStore } from "@/store/gameStore";

const { width } = Dimensions.get("window");

export default function GameScreen() {
  const { generation, livingCells } = useGameStore();

  return (
    <ScrollView className="flex-1 bg-[#0a0a0a]" contentContainerClassName="pb-4">
      <View className="px-4 pt-4">
        <Text className="text-white text-2xl font-bold text-center mb-1">
          Game of Life
        </Text>
        <Text className="text-gray-400 text-sm text-center mb-4">
          Conway&apos;s Cellular Automaton
        </Text>

        <View className="flex-row justify-around mb-4">
          <View className="items-center">
            <Text className="text-green-400 text-xl font-bold">{generation}</Text>
            <Text className="text-gray-500 text-xs">Generation</Text>
          </View>
          <View className="items-center">
            <Text className="text-green-400 text-xl font-bold">{livingCells}</Text>
            <Text className="text-gray-500 text-xs">Living Cells</Text>
          </View>
        </View>

        <GameBoard boardWidth={width - 32} />
        <GameControls />
      </View>
    </ScrollView>
  );
}
