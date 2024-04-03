import { FC, useState } from "react";
import { StatusIcon } from "../Assets/Icons/StatusIcon";
import { TCharacters } from "./CharactersSlider";
import classNames from "classnames";

type Props = {
  character: TCharacters & {
    episode: {
      id: string;
      name: string;
      air_date: string;
      episode: string;
      characters: { name: string }[];
    }[];
  };
};

const CharacterModal: FC<Props> = ({ character }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [characterEpisodeId, setCharacterEpisodeId] = useState<string>("");
  // const [episodeArr, setEpisodeArr] = useState<string[]>([]);

  const handleOpenModal = (id: string) => {
    setCharacterEpisodeId(id);
    setOpen(!open);
    // if (!episodeArr.includes(id)) {
    //   setEpisodeArr([...episodeArr, id]);
    // }
  };

  return (
    <div className="flex flex-col m-3 rounded-xl">
      <div className="flex">
        <img src={character.image} className="w-[375px] h-[375px]" />
        <div className="w-[900px] grid grid-cols-1 p-3">
          <div className="grid grid-cols-3 place-items-center text-center">
            <p className="font-bold">№{character.id}</p>
            <p className="text-3xl font-extrabold p-1">{character.name}</p>
            <div className="flex items-center">
              <StatusIcon status={character.status} />
              <p
                className={classNames("font-bold", {
                  "text-green-600": character.status === "Alive",
                  "text-red-600": character.status === "Dead",
                })}
              >
                {character.status}
              </p>
            </div>
            <p>
              Вид: <span className="font-semibold">{character.species}</span>
            </p>
            <p className="mx-auto">
              Пол: <span className="font-semibold">{character.gender}</span>
            </p>
            <p>
              Происхождение:{" "}
              <span className="font-semibold">{character.origin.name}</span>
            </p>
          </div>
          <div className="grid grid-rows-[50px_50px_200px] w-full place-items-center mt-2">
            <p className="text-2xl font-serif font-bold">Местоположение</p>
            <div className="w-full grid grid-cols-3  place-items-center">
              <p>
                Измерение:{" "}
                <span className="font-semibold">
                  {character.location.dimension}
                </span>
              </p>
              <p>
                Обитает:{" "}
                <span className="font-semibold">{character.location.type}</span>
              </p>
              <p>
                Название:{" "}
                <span className="font-semibold">{character.location.name}</span>
              </p>
            </div>
            <div
              className="w-full h-[200px] overflow-y-scroll [&::-webkit-scrollbar]:[width:8px]
    [&::-webkit-scrollbar-thumb]:bg-black"
            >
              <span className="font-semibold">Список резидентов планеты:</span>{" "}
              {character.location.residents.map(({ name }, index: number) => (
                <span key={index} className="font-mono">
                  {index === 0 ? name : `, ${name}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold ml-2">Эпизоды</p>
        <div
          className="max-h-[270px] p-2 mr-2 overflow-y-scroll [&::-webkit-scrollbar]:[width:8px]
    [&::-webkit-scrollbar-thumb]:bg-black"
        >
          {character.episode.map(
            (
              {
                name,
                air_date,
                episode,
                characters,
                id,
              }: {
                id: string;
                name: string;
                air_date: string;
                episode: string;
                characters: {
                  name: string;
                }[];
              },
              index
            ) => (
              <div key={index}>
                <div
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOpenModal(id)}
                >
                  <span className="font-semibold">{episode}</span>{" "}
                  <span className="text-lg font-mono">{name}</span>
                </div>
                {open && id === characterEpisodeId && (
                  <div
                    className="flex justify-around p-2 cursor-pointer hover:bg-gray-100 mb-5"
                    onClick={() => handleOpenModal(id)}
                  >
                    <div className="flex flex-col gap-5 text-2xl px-10">
                      <p>
                        Название серии:{" "}
                        <span className="text-2xl font-mono font-bold">
                          {name}
                        </span>
                      </p>
                      <p>
                        Дата выхода:{" "}
                        <span className="text-2xl font-mono font-bold">
                          {air_date}
                        </span>
                      </p>
                    </div>
                    <div className="w-[600px]">
                      <p className="font-semibold">
                        Список персонажей в серии:
                      </p>
                      {characters.map(
                        ({ name }: { name: string }, index: number) => (
                          <span key={index} className="font-mono">
                            {index === 0 ? name : `, ${name}`}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
