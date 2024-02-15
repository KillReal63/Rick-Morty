import { useQuery } from "@apollo/client";
import { MAIN_LIST } from "../Services/Queries";
import chunk from "lodash.chunk";
import { StatusIcon } from "../Assets/Icons/StatusIcon";

type Characters = {
  id: number;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  location: {
    name: string;
  };
  episode: { name: string }[];
};

const Character = () => {
  const { data } = useQuery(MAIN_LIST);

  if (!data) return <div>Loading...</div>;

  const charactersChunk = data && chunk(data.characters.results, 10);

  console.log(data);

  return charactersChunk[0].map(
    ({ image, name, status, species, location, episode, id }: Characters) => (
      <div
        key={id}
        className="w-[600px] h-[220px] flex bg-character rounded-lg m-3"
      >
        <img src={image} className="rounded-l-lg" />
        <div className="grid text-white p-3">
          <p className="text-2xl">{name}</p>
          <div className="flex items-center">
            <StatusIcon status={status} />
            <p>{status}</p>
            <p className="mx-1">-</p>
            <p>{species}</p>
          </div>
          <div>
            <p className="text-text_gray">Последняя локация</p>
            {location.name}
          </div>
          <div>
            <p className="text-text_gray">Появление</p>
            {episode[0].name}
          </div>
        </div>
      </div>
    )
  );
};

export default Character;
