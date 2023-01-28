import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CONSOLE_LOG } from "../utils/console-log";

interface HabitListProps {
  date: Date;
  onCompletedChange: (completed: number, habits?: number) => void;
}

interface PossibleHabitProps {
  id: string;
  title: string;
  created_at: string;
}

interface HabitInfo {
  possibleHabits: PossibleHabitProps[];
  completedHabits: string[];
}

export function HabitList({ date, onCompletedChange }: HabitListProps) {
  const [habitInfo, setHabitInfo] = useState<HabitInfo | undefined>(undefined);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabitWeek(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);
    const isHabitAlreadyCompleted = habitInfo!.completedHabits.includes(habitId);
    let completedHabits: string[] = [];
    if (isHabitAlreadyCompleted) {
      completedHabits = habitInfo!.completedHabits.filter((id) => id !== habitId);
    } else {
      completedHabits = [...habitInfo!.completedHabits, habitId];
    }

    setHabitInfo({
      possibleHabits: habitInfo!.possibleHabits,
      completedHabits: completedHabits,
    });
    onCompletedChange(completedHabits.length);
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(`day?date=${date}`);
      setHabitInfo(response.data);
    })();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          onCheckedChange={() => handleToggleHabitWeek(habit.id)}
          checked={habitInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          key={habit.id}
          className="flex items-center gap-3 group transition-all outline-none disabled:cursor-not-allowed  disabled:opacity-20"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 outline-none group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">{habit.title}</span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
