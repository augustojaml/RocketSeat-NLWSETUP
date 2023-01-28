import dayjs from "dayjs";
import { Dimensions } from "react-native";

const weekDay = 7;
const screenHorizontalPadding = (32 * 2) / 5;
const minimumSummaryDatesSizes = 18 * 5;

function generateRangeDatesFromYearStart() {
  const startDate = dayjs().startOf("year");
  const endDate = new Date();

  let dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dateRange;
}

export const Helpers = {
  WEEK_DAYS: weekDay,
  DAY_MARGIN_BETWEEN: 8,
  DAY_SIZE: Dimensions.get("screen").width / weekDay - (screenHorizontalPadding + 5),
  WEEKS: ["D", "S", "T", "Q", "Q", "S", "S"],
  GENERATE_RANGE_BETWEEN_DATE: generateRangeDatesFromYearStart(),
  MINIMUM_SUMMARY_DATES_SIZE: 18 * 5,
  AMOUNTS_DAY_TO_FILL: minimumSummaryDatesSizes - generateRangeDatesFromYearStart.length,
  AVAILABLE_WEEK_DAYS: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
  FORMATTED_DATE: (date: string) => {
    const parsedDate = dayjs(date);

    return {
      dayOfWeek: parsedDate.format("dddd"),
      dayAndMonth: parsedDate.format("DD/MM"),
    };
  },
  GENERATE_PROGRESS_PERCENTAGE: (amount: number, completed: number) => {
    return (completed / amount) * 100;
  },
};
