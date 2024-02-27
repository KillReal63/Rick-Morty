import { useQuery } from "@apollo/client";
import { MAIN_LIST } from "../Services/Queries";
import CharactersSlider from "./CharactersSlider";
import Loader from "../Assets/Icons/Loader";

const Main = () => {
  const firstCharactersSlider = useQuery(MAIN_LIST, { variables: { page: 8 } });
  const secondCharactersSlider = useQuery(MAIN_LIST, {
    variables: { page: 12 },
  });

  return (
    <div className="w-full h-[520px] grid justify-center bg-text">
      {firstCharactersSlider.data && secondCharactersSlider.data ? (
        <>
          <CharactersSlider
            data={firstCharactersSlider.data.characters.results}
          />
          <CharactersSlider
            data={secondCharactersSlider.data.characters.results}
          />
        </>
      ) : (
        <div className="grid place-items-center">
          <Loader variant="white" />
        </div>
      )}
    </div>
  );
};

export default Main;
