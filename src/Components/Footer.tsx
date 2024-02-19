import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";

const Footer = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(MAIN_LIST, { variables: { page: page } });

  return (
    data && (
      <div className="flex flex-col">
        <CharactersTable characters={data.characters.results} />
        <div className="flex w-full justify-around mb-8">
        <button onClick={() => setPage((prevValue) => prevValue !== 1 ? prevValue - 1 : 1)}>-</button>
        {page}
        <button onClick={() => setPage((prevValue) => prevValue + 1)}>+</button>
        </div>
      </div>
    )
  );
};

export default Footer;
