import React, { KeyboardEvent, useState } from "react";
import Back from "../Assets/Icons/Back";
import Forward from "../Assets/Icons/Forward";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPages: number;
};

const PageController: React.FC<Props> = ({ page, setPage, maxPages }) => {
  const [inputPage, setInputPage] = useState<number>(page);

  const handleKeyPress = (event: KeyboardEvent): void => {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter" && target.value !== undefined) {
      if (inputPage > 0 && inputPage <= maxPages) {
        setPage(inputPage);
      } else {
        setPage(1);
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mb-8">
      <div className="flex w-full justify-center items-center">
        <button type="button" onClick={() => setPage(page - 1)}>
          <Back />
        </button>
        <input
          type="text"
          maxLength={2}
          className="max-w-8 font-bold text-2xl appearance-none text-center"
          value={inputPage}
          onChange={(e) => setInputPage(Number(e.target.value))}
          onFocus={() =>
            document.addEventListener(
              "keypress",
              handleKeyPress as unknown as EventListener
            )
          }
          onBlur={() =>
            document.removeEventListener(
              "keypress",
              handleKeyPress as unknown as EventListener
            )
          }
          onKeyDown={handleKeyPress}
        />
        <button type="button" onClick={() => setPage(page + 1)}>
          <Forward />
        </button>
      </div>
      <div className="flex items-center">
        Страница
        <p className="font-bold ml-1">
          {page} из {maxPages}
        </p>
      </div>
    </div>
  );
};

export default PageController;
