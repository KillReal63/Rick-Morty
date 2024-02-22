import { useQuery } from "@apollo/client";
import { useState, KeyboardEvent } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";

const Footer = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(1);

  const switchPage = (variant: string) => {
    switch (variant) {
      case "next":
        setPage((prevValue) => prevValue + 1);
        setInputValue((prevValue) => prevValue + 1);
        break;
      case "previous":
        if (page - 1 >= 1) {
          setPage((prevValue) => prevValue - 1);
          setInputValue((prevValue) => prevValue - 1);
        }
        break;
      case "first":
        setPage(1);
        setInputValue(1);
        break;
    }
  };

  const { data } = useQuery(MAIN_LIST, { variables: { page: page } });

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;

    if (event.key === "Enter" && target.value !== undefined) {
      setPage(Number(target.value));
    }

    if (target.value === "0") {
      switchPage("first");
    }
  };

  return (
    data && (
      <div className="flex flex-col">
        <CharactersTable characters={data.characters.results} />
        <div className="flex w-full justify-center items-center mb-8">
          <button onClick={() => switchPage("previous")}>
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
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>

          <input
            type="text"
            min={1}
            maxLength={2}
            className="max-w-8 font-bold text-2xl appearance-none text-center"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
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

          <button onClick={() => switchPage("next")}>
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
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default Footer;
