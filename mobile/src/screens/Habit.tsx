import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { HabitEmpty } from "../components/HabitEmpty";
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/ProgressBar";
import { Helpers } from "../helpers";
import { api } from "../libs/axios";

interface PossibleHabitsProps {
  id: string;
  created_at: string;
  title: string;
}

interface ResponseProps {
  possibleHabits: PossibleHabitsProps[];
  completedHabits: string[];
}

export function Habit() {
  const [isLoading, setIsLoading] = useState(true);
  const PARAMS = useRoute().params as { date: string };
  const [habitsResponse, setHabitsResponse] = useState<ResponseProps | undefined>(undefined);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const isDateInPast = dayjs(PARAMS.date).endOf("day").isBefore(new Date());

  const habitProgress =
    habitsResponse && habitsResponse.possibleHabits.length > 0
      ? Helpers.GENERATE_PROGRESS_PERCENTAGE(habitsResponse.possibleHabits.length, completedHabits.length)
      : 0;

  async function handleToggleCompletedHabit(habitId: string) {
    try {
      completedHabits.includes(habitId)
        ? setCompletedHabits((state) => state.filter((habit) => habit !== habitId))
        : setCompletedHabits((state) => [...state, habitId]);
      await api.patch(`habits/${habitId}/toggle`);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Não foi possível atualizar o status do hábito");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/day", { params: { date: PARAMS.date } });
        setHabitsResponse(response.data);
        setCompletedHabits(response.data.completedHabits);
      } catch (error) {
        console.log(error);
        Alert.alert("Ops!", "Não foi possível carregar as informações do hábito");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <BackButton />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Text className="mt-6 text-zinc-400 font-FontWeight400 lowercase">
                {Helpers.FORMATTED_DATE(PARAMS.date).dayOfWeek}
              </Text>
              <Text className="text-white font-FontWeight900 text-3xl">
                {Helpers.FORMATTED_DATE(PARAMS.date).dayAndMonth}
              </Text>
              <ProgressBar progress={habitProgress} />
              <View
                className={clsx("mt-6", {
                  ["opacity-25"]: isDateInPast,
                })}
              >
                {habitsResponse?.possibleHabits && habitsResponse?.possibleHabits.length > 0 ? (
                  habitsResponse.possibleHabits?.map((item) => (
                    <CheckBox
                      key={item.id}
                      title={item.title}
                      checked={completedHabits.includes(item.id)}
                      onPress={() => handleToggleCompletedHabit(item.id)}
                      disabled={isDateInPast}
                    />
                  ))
                ) : (
                  <HabitEmpty />
                )}
              </View>
              {isDateInPast && habitsResponse?.possibleHabits && habitsResponse?.possibleHabits.length > 0 && (
                <View className="bg-red-200/30 rounded-lg p-4 mt-6">
                  <Text className="text-center text-3xl">🙁</Text>
                  <Text className="text-zinc-400 font-FontWeight400 text-center">
                    Você não pode editar hábitos de uma data passada
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}
