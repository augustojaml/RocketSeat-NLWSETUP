import { Check } from "phosphor-react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useEffect, useState } from "react";
import { CONSOLE_LOG } from "../utils/console-log";
import { availableWeekDays } from "../utils/available-week-days";
import { api } from "../lib/axios";

export function NewHabitFormContentModal() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    weekDays.includes(weekDayIndex) ? setWeekDays((state) => state.filter((week) => week !== weekDayIndex)) : setWeekDays((state) => [...state, weekDayIndex]);
  }

  async function handlerCreateNewHabit(event: FormEvent) {
    event.preventDefault();
    if (!title || weekDays.length === 0) {
      return;
    }
    await api.post("habits", {
      title: title,
      habitWeekDays: weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito cadastrado!");

    // CONSOLE_LOG("handlerCreateNewHabit", { title, weekDays });
  }

  return (
    <>
      <form onSubmit={handlerCreateNewHabit} className="w-full flex flex-col mt-6">
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>
        <input
          type="text"
          id="title"
          placeholder="ex.: Exercícios, dormi bem, etc..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-800"
        />

        <label htmlFor="title" className="font-semibold leading-tight mt-4">
          Qual a recorrência?
        </label>

        <div className="mt-6 flex flex-col gap-2 mt-3">
          {availableWeekDays.map((week, index) => (
            <Checkbox.Root checked={weekDays.includes(index)} key={week} className="flex items-center gap-3 group focus:outline-none" onCheckedChange={() => handleToggleWeekDay(index)}>
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-all  group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="text-white leading-tight">{week}</span>
            </Checkbox.Root>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <Check size={20} weight="bold" />
          Confirmar
        </button>
      </form>
    </>
  );
}
