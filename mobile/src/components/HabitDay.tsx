import clsx from "clsx";
import dayjs from "dayjs";
import { Dimensions, TouchableHighlightProps, TouchableOpacity } from "react-native";
import { Helpers } from "../helpers";

interface HabitDayProps extends TouchableHighlightProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) {
  const percentage = amount > 0 ? Helpers.GENERATE_PROGRESS_PERCENTAGE(amount, completed) : 0;
  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className={clsx("rounded-lg m-1 border-2", {
          ["bg-zinc-900 border-zinc-800"]: percentage === 0,
          ["bg-violet-900 border-violet-700"]: percentage > 0 && percentage < 20,
          ["bg-violet-800 border-violet-600"]: percentage >= 20 && percentage < 40,
          ["bg-violet-700 border-violet-500"]: percentage >= 40 && percentage < 60,
          ["bg-violet-600 border-violet-500"]: percentage >= 60 && percentage < 80,
          ["bg-violet-500 border-violet-400"]: percentage >= 80,
          ["border-white border-4"]: isCurrentDay,
        })}
        style={{
          width: Helpers.DAY_SIZE,
          height: Helpers.DAY_SIZE,
        }}
        {...rest}
      />
    </>
  );
}
