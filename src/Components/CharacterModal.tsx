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
      <img src={character.image} />О пресонаже
      <div className="grid p-3">
        <p className="text-2xl">{character.name}</p>
        <div className="flex items-center">
          <StatusIcon status={character.status} />
          <p>{character.status}</p>
        </div>
        Вид:
        <p>{character.species}</p>
        Пол:
        <p>{character.gender}</p>
        Происхождение:
        <p>{character.origin.name}</p>
      </div>
      местоположение
      <div>
        измерение
        <p>{character.location.dimension}</p>
        тип планеты
        <p>{character.location.type}</p>
        название планеты
        <p>{character.location.name}</p>
        Список резидентов
        <div className="h-[200px] overflow-scroll">
          {character.location.residents.map(({ name }, index: number) => (
            <p key={index}>{name}</p>
          ))}
        </div>
        эпизоды
        <div>
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
