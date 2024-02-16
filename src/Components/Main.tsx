import { useQuery } from "@apollo/client";
import { MAIN_LIST } from "../Services/Queries";

import CharactersSlider from "./CharactersSlider";

const Main = () => {
  const firstCharactersSlider = useQuery(MAIN_LIST, { variables: { page: 8 } });
  const secondCharactersSlider = useQuery(MAIN_LIST, {
    variables: { page: 12 },
  });

  return (
    <div className="w-full grid justify-center bg-text">
      {firstCharactersSlider.data && (
        <CharactersSlider
          data={firstCharactersSlider.data.characters.results}
        />
      )}
      {secondCharactersSlider.data && (
        <CharactersSlider
          data={secondCharactersSlider.data.characters.results}
        />
      )}
    </div>
  );
};

export default Main;
