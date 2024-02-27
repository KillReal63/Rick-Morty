import { MouseEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import ControllerSelects from "./ControllerSelects";
import {
  genderOptions,
  speciesOptions,
  statusOptions,
} from "../Services/Options";
import Send from "../Assets/Icons/Send";
import Reset from "../Assets/Icons/Reset";
import Dropdown from "../Assets/Icons/Dropdown";

const FilterBar = ({
  onSubmit,
}: {
  onSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { register, control } = useFormContext();

  return (
    <div>
      <div
        className="w-full h-10 flex justify-between px-3 items-center bg-table_header border-solid border-white border-b-2 rounded-b-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-bold">Search:</span>
        <Dropdown />
      </div>
      {open && (
        <div className="flex w-full items-center justify-around py-2">
          <button>
            <Reset />
          </button>

          <input
            placeholder="Поиск по имени"
            className="w-[250px] border-2 p-1 rounded-md"
            {...register("name", {
              pattern: /[a-zA-Z0-9]/,
            })}
          />
          <ControllerSelects
            name={"gender"}
            label={"Пол"}
            control={control}
            options={genderOptions}
          />
          <ControllerSelects
            name={"species"}
            label={"Вид"}
            control={control}
            options={speciesOptions}
          />
          <ControllerSelects
            name={"status"}
            label={"Cтатус"}
            control={control}
            options={statusOptions}
          />
          <button onClick={(e) => onSubmit(e)}>
            <Send />
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
