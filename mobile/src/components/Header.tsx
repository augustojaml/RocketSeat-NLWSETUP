import { Text, TouchableOpacity, View } from "react-native";
import { HabitLogo, LogoSvg } from "../assets";
import { Feather as FeatherIcon } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const navigation = useNavigation();

  return (
    <>
      <View className="w-full flex-row items-center justify-between">
        <HabitLogo height={65} />
        <TouchableOpacity activeOpacity={0.7} className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center" onPress={() => navigation.navigate("New")}>
          <FeatherIcon name="plus" color={colors.violet[500]} size={20} />
          <Text className="text-white ml-3 font-FontWeight600 text-base">Novo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
