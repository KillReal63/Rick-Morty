import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";

const Footer = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(MAIN_LIST, { variables: { page: page } });

  return (
    data && (
      <div>
        <CharactersTable characters={data.characters.results} />
        <button onClick={() => setPage((prevValue) => prevValue + 1)}>+</button>
      </div>
    )
  );
};

export default Footer;
