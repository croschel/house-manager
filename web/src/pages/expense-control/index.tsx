import { DataBox } from "@/components/generic/data-box";
import { DatePicker } from "@/components/generic/date-picker";
import { DatePickerRange } from "@/components/generic/date-picker-range";
import { Dropdown } from "@/components/generic/dropdown";
import { FormModal } from "@/components/generic/form-modal";
import { Header } from "@/components/generic/header";
import { InputLabel } from "@/components/generic/input-label";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

export const ExpenseControl = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [fundModal, setFundModal] = useState(false);
  const handleOpenExpenseModal = (type: "expense" | "fund") => {
    if (type === "fund") {
      setFundModal(true);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="flex w-full h-full flex-col p-6 overflow-y-auto gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <h1 className="text-[40px] text-zinc-200">Controle de Gastos</h1>
            <DatePickerRange date={date} onChange={setDate} />
          </div>
          <div className="flex gap-4">
            <Button
              variant="destructive"
              onClick={() => handleOpenExpenseModal("expense")}
            >
              Adicionar Despesa
            </Button>
            <Button
              variant="creation"
              onClick={() => handleOpenExpenseModal("fund")}
            >
              Adicionar Fundo
            </Button>
          </div>
        </div>
        <div className="flex w-full mt-6 gap-4">
          <DataBox
            title="Saldo Total"
            mainValue="$45.000,00"
            subTitle="Saldo do último mês"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Maior Gasto"
            mainValue="$5.000,00"
            subTitle="máquina de lavar"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="Menor Gasto"
            mainValue="$1.000,00"
            subTitle="minhas compras"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
          <DataBox
            title="7 Maiores Gastos por Categoria"
            iconName="DollarSign"
            iconColor="white"
            iconSize={18}
          />
        </div>
        <div className="flex flex-1 w-full mt-6 gap-4">
          <DataBox
            title="Overview de Gastos"
            iconName="BarChartHorizontal"
            iconColor="white"
            iconSize={18}
            className="h-[100%] min-w-[60%]"
          />
          <DataBox
            title="Últimos 7 Gastos"
            iconName="BarChartHorizontal"
            iconColor="white"
            iconSize={18}
            className="h-[100%]"
          />
        </div>
      </main>
      <FormModal
        isOpen={fundModal}
        setIsOpen={() => setFundModal(false)}
        title="Adicionar Fundo"
        description="Adicionar um recebimento de proventos"
        buttonLabel="Adicionar Fundo"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-4 items-center">
            <InputLabel
              id="name"
              label="Nome"
              boxStyles="w-[60%]"
              inputProps={{ placeholder: "Digite o nome do provento" }}
            />
            <Dropdown
              id="category"
              label="Categoria"
              boxStyles="w-[40%]"
              value=""
              onChange={() => {}}
              options={[
                { label: "Receita", value: "1" },
                { label: "Despesa", value: "2" },
              ]}
            />
          </div>
          <div className="flex flex-row gap-4">
            <InputLabel
              id="value"
              label="Valor"
              inputProps={{
                type: "number",
                placeholder: "Digite o valor",
              }}
              boxStyles="w-[60%]"
            />
            <DatePicker
              id="date"
              date={new Date()}
              setDate={() => {}}
              label="Data"
              boxStyles="w-[40%] "
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
};
