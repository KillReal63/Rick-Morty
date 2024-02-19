import { FC } from "react";
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
  console.log(character, "characket");

  return (
    <div className="flex flex-col m-3 rounded-xl">
      <div className="flex">
        <img src={character.image} className="w-[350px] h-[350px]" />
        <div className="p-3">
          <div className="flex justify-around w-[800px] my-2">
            <p>№{character.id}</p>
            <p className="text-2xl">{character.name}</p>
            <div className="flex items-center">
              <StatusIcon status={character.status} />
              <p>{character.status}</p>
            </div>
          </div>
          <div className="flex justify-center my-2">
            <p>Вид: {character.species}</p>
            <p className="mx-auto">Пол: {character.gender}</p>
            <p>Происхождение: {character.origin.name}</p>
          </div>
          Местоположение
          <div className="grid w-full">
            <p>Измерение: {character.location.dimension}</p>
            <p>Тип планеты: {character.location.type}</p>
            <p>Название: {character.location.name}</p>
            <div className="h-[200px] overflow-scroll">
              Список резидентов:
              {character.location.residents.map(({ name }, index: number) => (
                <p key={index}>{name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        эпизоды
        <div className="h-[150px] overflow-scroll">
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
              <div key={index}>
                имя
                <p>{name}</p>
                дата выхода
                <p>{air_date}</p>
                код серии
                <p>{episode}</p>
                список персонажей
                <div className="h-[100px] overflow-scroll">
                  {characters.map(
                    ({ name }: { name: string }, index: number) => (
                      <p key={index}>{name}</p>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
