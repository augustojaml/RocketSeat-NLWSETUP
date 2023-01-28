import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Helpers } from "../helpers";
import colors from "tailwindcss/colors";
import { api } from "../libs/axios";

export function New() {
  const [weekDays, setWeekDay] = useState<number[]>([]);
  const [habit, setHabit] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleWeekDay(weekDayIndex: number) {
    weekDays.includes(weekDayIndex) ? setWeekDay((state) => state.filter((week) => week !== weekDayIndex)) : setWeekDay((state) => [...state, weekDayIndex]);
  }

  async function handleAddHabit() {
    try {
      setIsLoading(true);
      if (!habit.trim() || weekDays.length === 0) {
        return Alert.alert("Novo Hábito", "Informe a data e selecione o(s) dia(s) da semana");
      }
      await api.post("/habits", {
        title: habit,
        habitWeekDays: weekDays,
      });

      setHabit("");
      setWeekDay([]);
      Alert.alert("Sucesso", "Hábito criado com sucesso");
    } catch (error) {
      console.log(JSON.stringify(error));
      Alert.alert("Error", "Não foi possível cadastrar um hábito");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <BackButton />

          <Text className="mt-6 text-white font-FontWeight700 text-3xl">Criar hábito</Text>
          <Text className="mt-6 mb-2 text-zinc-300 font-FontWeight600 text-base">Qual seu comprometimento?</Text>

          <TextInput
            placeholder="Exercícios, dormir bem, etc..."
            value={habit}
            onChangeText={setHabit}
            placeholderTextColor={colors.zinc[400]}
            className="h-12 pl-4 rounded-lg bg-zinc-900 font-FontWeight400 text-white border-2 border-zinc-800 focus:border-green-600"
          />

          <Text className="mt-4 mb-3 text-white font-FontWeight600">Qual a recorrência?</Text>

          {Helpers.AVAILABLE_WEEK_DAYS.map((week, index) => (
            <CheckBox key={week} title={week} onPress={() => handleToggleWeekDay(index)} checked={weekDays.includes(index)} />
          ))}

          <TouchableOpacity activeOpacity={0.7} onPress={handleAddHabit} className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
            {isLoading ? (
              <ActivityIndicator size={20} color={colors.white} />
            ) : (
              <>
                <Feather name="check" size={20} color={colors.white} />
                <Text className="font-FontWeight600 text-white ml-2">Confirmar</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}
