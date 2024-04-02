import { useState, FC } from "react";
import CharactersTable from "./CharactersTable";
import FilterBar from "./FilterBar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
type FormValues = {
  name: string;
  gender: { value: string };
  species: { value: string };
  status: { value: string };
};

const Footer: FC = () => {
  const [filterCharacters, setFilterCharacters] = useState({
    name: "",
    gender: "",
    species: "",
    status: "",
  });
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    gender,
    species,
    status,
  }): void => {
    setFilterCharacters({
      name: name ? name : "",
      gender: gender ? gender.value : "",
      species: species ? species.value : "",
      status: status ? status.value : "",
    });
  };

  return (
    <div className="flex flex-col">
      <FormProvider {...methods}>
        <form>
          <FilterBar onSubmit={methods.handleSubmit(onSubmit)} />
          <CharactersTable filterCharacters={filterCharacters} />
        </form>
      </FormProvider>
    </div>
  );
};

export default Footer;
