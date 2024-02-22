import { useState } from "react";
import { useForm } from "react-hook-form";
import ControllerSelects from "./ControllerSelects";
import { useQuery } from "@apollo/client";
import { FILTER_CHARACTERS } from "../Services/Queries";
import {
  genderOptions,
  speciesOptions,
  statusOptions,
} from "../Services/Options";

const FilterBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [queryFilter, setQueryFilter] = useState<string>("");

  const { register, handleSubmit, control } = useForm();

  const { data } = useQuery(FILTER_CHARACTERS, {
    variables: { filter: { queryFilter } },
  });

  console.log(data);

  return (
    <>
      <div
        className="w-full h-10 flex justify-between px-3 items-center bg-table_header border-solid border-white border-b-2 rounded-b-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-bold">Search:</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="main-grid-item-icon"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <div className="flex w-full items-center justify-around py-2">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </button>

          <input
            placeholder="Поиск по имени"
            className="w-[250px] border-2 p-1 rounded-md"
            required
            pattern="[a-zA-Z0-9]"
          />
          <ControllerSelects
            name={"gender"}
            label={"Пол"}
            control={control}
            options={genderOptions}
          />
          <ControllerSelects
            name={"spices"}
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
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <line x1="5" x2="19" y1="12" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default FilterBar;
