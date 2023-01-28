import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Helpers } from "../helpers";
import { api } from "../libs/axios";

interface SummaryProps {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function Home() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [summaries, setSummaries] = useState<SummaryProps[]>([]);

  function handleNavigateToHabit(date: Date) {
    navigation.navigate("Habit", { date: date.toISOString() });
  }

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setIsLoading(true);
          const response = await api.get("/summary");
          setSummaries(response.data);
        } catch (error) {
          Alert.alert("Ops!!!", "Não foi possível carregar seus dados");
        } finally {
          setIsLoading(false);
        }
      })();
    }, [])
  );

  return (
    <>
      <View className="flex-1 bg-background px-8 pt-16">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <View className="flex-row mt-6 mb-2">
              {Helpers.WEEKS.map((week, index) => {
                return (
                  <Text
                    key={`${week}-${index}`}
                    className="text-zinc-700 text-xl font-bold text-center mx-1"
                    style={{ width: Helpers.DAY_SIZE }}
                  >
                    {week}
                  </Text>
                );
              })}
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
              <View className="flex-row flex-wrap">
                {Helpers.GENERATE_RANGE_BETWEEN_DATE.map((date) => {
                  const dayInSummary = summaries.find((day) => {
                    return dayjs(date).isSame(day.date, "day");
                  });
                  return (
                    <HabitDay
                      key={date.toISOString()}
                      date={date}
                      amount={dayInSummary?.amount}
                      completed={dayInSummary?.completed}
                      onPress={() => handleNavigateToHabit(date)}
                    />
                  );
                })}
                {Helpers.AMOUNTS_DAY_TO_FILL > 0 &&
                  Array.from({ length: Helpers.AMOUNTS_DAY_TO_FILL }).map((_, index) => (
                    <View
                      key={index}
                      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                      style={{ width: Helpers.DAY_SIZE, height: Helpers.DAY_SIZE }}
                    />
                  ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
}
