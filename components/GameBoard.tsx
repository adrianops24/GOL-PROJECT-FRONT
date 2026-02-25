import { View, TouchableOpacity, Dimensions } from "react-native";
import { useGameStore } from "@/store/gameStore";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useCallback } from "react";

interface GameBoardProps {
  boardWidth: number;
}

export default function GameBoard({ boardWidth }: GameBoardProps) {
  const { grid, settings, toggleCell } = useGameStore();
  useGameEngine();

  const cellSize = Math.floor(boardWidth / settings.cols);
  const boardHeight = cellSize * settings.rows;

  const handleCellPress = useCallback(
    (row: number, col: number) => {
      toggleCell(row, col);
    },
    [toggleCell]
  );

  return (
    <View
      style={{
        width: boardWidth,
        height: boardHeight,
        backgroundColor: "#0a0a0a",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {grid.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{ flexDirection: "row" }}
        >
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              onPress={() => handleCellPress(rowIndex, colIndex)}
              activeOpacity={0.7}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? "#4ade80" : "#111827",
                borderWidth: settings.showGrid ? 0.5 : 0,
                borderColor: "#1f2937",
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
