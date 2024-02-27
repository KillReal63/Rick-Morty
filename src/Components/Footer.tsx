import { useQuery } from "@apollo/client";
import { useState, FC } from "react";
import { MAIN_LIST } from "../Services/Queries";
import CharactersTable from "./CharactersTable";
import FilterBar from "./FilterBar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PageController from "./PageController";

type FormValues = {
  name: string;
  gender: { value: string };
  species: { value: string };
  status: { value: string };
};

const Footer: FC = () => {
  const [page, setPage] = useState(1);
  const [filterCharacters, setFilterCharacters] = useState({});
  const methods = useForm<FormValues>();
  const { data } = useQuery(MAIN_LIST, {
    variables: { page: page, filter: filterCharacters },
  });

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    gender,
    species,
    status,
  }) => {
    setFilterCharacters({
      name: name ? name : "",
      gender: gender ? gender.value : "",
      species: species ? species.value : "",
      status: status ? status.value : "",
    });
  };

  return (
    data && (
      <div className="flex flex-col">
        <FormProvider {...methods}>
          <form>
            <FilterBar onSubmit={methods.handleSubmit(onSubmit)} />
            <CharactersTable characters={data.characters.results} />
          </form>
        </FormProvider>
        <PageController page={page} setPage={setPage} />
      </div>
    )
  );
};

export default Footer;
