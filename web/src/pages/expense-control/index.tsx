import { DatePickerRange } from "@/components/generic/date-picker-range";
import { Header } from "@/components/generic/header";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

export const ExpenseControl = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="flex w-full p-6 overflow-y-auto">
        <div>
          <h1>Controle de Gastos</h1>
          <DatePickerRange date={date} onChange={setDate} />
        </div>
      </main>
    </div>
  );
};
