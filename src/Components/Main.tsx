import { useQuery } from "@apollo/client";
import { MAIN_LIST } from "../Services/Queries";
import CharactersSlider from "./CharactersSlider";
import Loader from "../Assets/Icons/Loader";

const Main = () => {
  const { data: firstSlide } = useQuery(MAIN_LIST, { variables: { page: 8 } });
  const { data: secondSlide } = useQuery(MAIN_LIST, {
    variables: { page: 12 },
  });

  return (
    <div className="w-full h-[520px] grid justify-center bg-text">
      {firstSlide && secondSlide ? (
        <>
          <CharactersSlider data={firstSlide.characters.results} />
          <CharactersSlider data={secondSlide.characters.results} />
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
