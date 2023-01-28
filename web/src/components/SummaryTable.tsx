import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { weekDays } from "../utils/week-days";
import { HabitDay } from "./HabitDay";

const summaryDate = generateDatesFromYearBeginning();

const minimusSummaryDateSize = 18 * 7; // 18 weeks
const amountOfDaysToTill = minimusSummaryDateSize - summaryDate.length;

interface SummaryProps {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function SummaryTable() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/summary");
      setSummaries(response.data);
    })();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekDays.map((week, index) => (
          <div key={`${week}-${index}`} className="text-zinc-400 text-xl h-10 w-10 flex font-bold items-center justify-center">
            {week}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaries.length > 0 &&
          summaryDate.map((date) => {
            const dayInSummary = summaries.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return <HabitDay date={date} amount={dayInSummary?.amount} defaultcompleted={dayInSummary?.completed} key={date.getTime().toString()} />;
          })}
        {amountOfDaysToTill > 0 &&
          Array.from({ length: amountOfDaysToTill }).map((_, i) => <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>)}
      </div>
    </div>
  );
}
