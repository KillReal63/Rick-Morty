import classNames from "classnames";
import { StatusIcon } from "../Assets/Icons/StatusIcon";
import Slider from "react-slick";
import { ChangeEvent, useEffect, useState } from "react";
const settings = {
  infinite: true,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 3000,
  swipeToSlide: true,
};

export type TCharacters = {
  id: number;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
    type: string;
    dimension: string;
    residents: {
      name: string;
    }[];
  };
  episode: { name: string }[];
};

const CharactersSlider = ({ data }: { data: TCharacters[] }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleChange = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleChange);

    return () => window.removeEventListener("resize", handleChange);
  }, []);

  console.log(screenWidth);

  return (
    <div className={classNames("w-[1050px] h-[260px]")}>
      <Slider
        slidesToShow={screenWidth > 1850 ? 3 : screenWidth > 768 ? 2 : 1}
        {...settings}
      >
        {data.map(({ image, name, status, species, location, episode, id }) => (
          <div key={id}>
            <div className="w-[600px] h-[220px] flex bg-character rounded-lg m-3">
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CharactersSlider;
