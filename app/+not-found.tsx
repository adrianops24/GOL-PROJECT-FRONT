import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-[#0a0a0a]">
        <Text className="text-white text-2xl font-bold">Page Not Found</Text>
        <Link href="/" className="mt-4">
          <Text className="text-green-400 text-base">Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}
