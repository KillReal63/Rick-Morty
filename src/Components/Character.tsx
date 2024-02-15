const Character = () => {
  return (
    <div className="w-[600px] h-[220px] flex bg-character rounded-lg m-3">
      <img
        src="https://rickandmortyapi.com/api/character/avatar/62.jpeg"
        className="rounded-l-lg"
      />
      <div className="grid text-white p-3">
        <p className="text-2xl">Имя</p>
        <div className="flex">
          <p>Статус</p>
          <p className="mx-1">-</p>
          <p>Раса</p>
        </div>
        <div>
          <p className="text-text_gray">Последняя локация</p>
          {"ЛОКАЦИЯ"}
        </div>
        <div>
          <p className="text-text_gray">Появление</p>
          {"ПОЯВЛЕНИЕ"}
        </div>
      </div>
    </div>
  );
};

export default Character;
