import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function HabitEmpty() {
  const navigation = useNavigation();
  return (
    <>
      <View className="bg-green-200/30 rounded-lg p-4">
        <Text className="text-center text-3xl">😅</Text>
        <Text className="text-zinc-400 font-FontWeight400 text-center mb-4">
          Você ainda não esta monitorando nenhum hábito
        </Text>

        <Text onPress={() => navigation.navigate("New")} className="text-green-500 font-FontWeight400 text-center">
          Clique aqui e cadastre um novo hábito
        </Text>
      </View>
    </>
  );
}
