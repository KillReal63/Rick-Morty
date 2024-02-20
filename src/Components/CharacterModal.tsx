import { FC, useState } from "react";
import { StatusIcon } from "../Assets/Icons/StatusIcon";
import { TCharacters } from "./CharactersSlider";

type Props = {
  character: TCharacters & {
    episode: {
      name: string;
      air_date: string;
      episode: string;
      characters: { name: string }[];
    }[];
  };
};

const CharacterModal: FC<Props> = ({ character }) => {
  const [open, setOpen] = useState(false);

  console.log(character, "characket");

  return (
    <div className="flex flex-col m-3 rounded-xl">
      <div className="flex">
        <img src={character.image} className="w-[375px] h-[375px]" />
        <div className="w-[900px] grid grid-rows-[60px_300px] grid-cols-1 p-3">
          <div className="grid grid-cols-3 grid-rows-2 place-items-center">
            <p>№{character.id}</p>
            <p className="text-2xl">{character.name}</p>
            <div className="flex items-center">
              <StatusIcon status={character.status} />
              <p>{character.status}</p>
            </div>
            <p>Вид: {character.species}</p>
            <p className="mx-auto">Пол: {character.gender}</p>
            <p>Происхождение: {character.origin.name}</p>
          </div>
          <div className="grid grid-rows-[50px_50px_200px] w-full place-items-center">
            <p>Местоположение</p>
            <div className="w-full grid grid-cols-3  place-items-center">
              <p>Измерение: {character.location.dimension}</p>
              <p>Тип планеты: {character.location.type}</p>
              <p>Название: {character.location.name}</p>
            </div>
            <div className="w-full h-[200px] overflow-y-scroll">
              <p>Список резидентов планеты:</p>
              {character.location.residents.map(({ name }, index: number) => (
                <span key={index}> {index === 0 ? name : `, ${name}`}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Эпизоды</p>
        <div className="h-[250px] overflow-y-scroll">
          {character.episode.map(
            (
              {
                name,
                air_date,
                episode,
                characters,
              }: {
                name: string;
                air_date: string;
                episode: string;
                characters: {
                  name: string;
                }[];
              },
              index
            ) => (
              <div key={index} className="cursor-pointer">
                <div onClick={() => setOpen(!open)}>
                  <p>{episode}</p>
                  <p>{name}</p>
                </div>
                {open && (
                  <div>
                    <p>{name}</p>
                    <p>{air_date}</p>
                    <div>
                      <p>Список персонажей в серии:</p>
                      {characters.map(
                        ({ name }: { name: string }, index: number) => (
                          <p key={index}>{name}</p>
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
