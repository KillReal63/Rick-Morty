import { FC, useState } from "react";
import { TCharacters } from "./CharactersSlider";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER, MAIN_LIST } from "../Services/Queries";
import Modal from "./Modal";
import classNames from "classnames";
import CharacterModal from "./CharacterModal";
import useScreenWidth from "../helpers/useScreenWidth";
import PageController from "./PageController";
import Loader from "../Assets/Icons/Loader";

type Props = {
  filterCharacters: {
    name: string;
    gender: string;
    species: string;
    status: string;
  };
};

const CharactersTable: FC<Props> = ({ filterCharacters }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [characterId, setCharacterId] = useState<number>(0);

  const { data, loading } = useQuery(MAIN_LIST, {
    variables: { page: page, filter: filterCharacters },
  });

  const { data: characterData } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  const screenWidth = useScreenWidth();

  const handleToggleModal = (id: number): void => {
    setCharacterId(id);
    setOpen(!open);
  };

  const columnHelper = createColumnHelper<TCharacters>();

  const columns = [
    columnHelper.group({
      id: "characters",
      header: "Characters",
      footer: (info) => info.column.id,
      columns: [
        columnHelper.accessor("id", {
          header: "№",
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("name", {
          header: "Name",
          cell: (info) => {
            return (
              <div
                style={{
                  width: info.column.getSize(),
                }}
              >
                <button
                  type="button"
                  onClick={() => handleToggleModal(info.row.original.id)}
                >
                  {info.getValue().length > 10 && screenWidth <= 1850
                    ? info.getValue().slice(0, 10) + "..."
                    : info.getValue()}
                </button>
              </div>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("species", {
          header: "Species",
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("gender", {
          header: "Gender",
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("origin.name", {
          header: "Planet Name",
          cell: (info) => {
            return (
              <p
                style={{
                  width: info.column.getSize(),
                }}
              >
                {info.getValue().length > 5 && screenWidth <= 1850
                  ? screenWidth < 1300
                    ? info.getValue().slice(0, 5) + "..."
                    : info.getValue().slice(0, 10) + "..."
                  : info.getValue()}
              </p>
            );
          },
          footer: (info) => info.column.id,
        }),
      ],
    }),
    columnHelper.group({
      id: "location",
      header: "Location",
      columns: [
        columnHelper.accessor("location.name", {
          header: "Location Name",
          cell: (info) => {
            return (
              <p
                style={{
                  width: info.column.getSize(),
                }}
              >
                {info.getValue().length > 5 && screenWidth <= 1850
                  ? screenWidth < 1300
                    ? info.getValue().slice(0, 5) + "..."
                    : info.getValue().slice(0, 10) + "..."
                  : info.getValue()}
              </p>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.type", {
          header: "Location Type",
          cell: (info) => {
            return (
              <p
                style={{
                  width: info.column.getSize(),
                }}
              >
                {info.getValue() !== null &&
                info.getValue().length > 5 &&
                screenWidth <= 1850
                  ? screenWidth < 1300
                    ? info.getValue().slice(0, 5) + "..."
                    : info.getValue().slice(0, 10) + "..."
                  : info.getValue() || "N/A"}
              </p>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.dimension", {
          header: () => <span>Dimension</span>,
          cell: (info) => {
            return (
              <p
                style={{
                  width: info.column.getSize(),
                }}
              >
                {info.getValue() !== null &&
                info.getValue().length > 5 &&
                screenWidth <= 1850
                  ? screenWidth < 1300
                    ? info.getValue().slice(0, 5) + "..."
                    : info.getValue().slice(0, 10) + "..."
                  : info.getValue() || "N/A"}
              </p>
            );
          },
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.residents", {
          header: () => <span>First Resident</span>,
          cell: (info) => {
            const residents = info.getValue();
            return (
              <p
                style={{
                  width: info.column.getSize(),
                }}
              >
                {residents[0]?.name !== undefined
                  ? screenWidth > 1900
                    ? residents[0]?.name
                    : screenWidth > 1300
                    ? `${residents[0]?.name.slice(0, 10)}...`
                    : `${residents[0]?.name.slice(0, 5)}...`
                  : "N/A"}
              </p>
            );
          },
          footer: (info) => info.column.id,
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data: data?.characters.results,
    columns,
    defaultColumn: {
      size: screenWidth >= 1850 ? 150 : screenWidth > 1300 ? 100 : 75,
      minSize: 50,
      maxSize: 150,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="w-full h-[800px] grid place-items-center">
        <Loader variant="black" />
      </div>
    );

  return (
    <>
      <table className="w-full border-collapse mb-4 font text-base">
        <thead className="bg-table_header text-white text-left font-bold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="py-3 px-4"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-solid border-b-2 even:bg-even last-of-type:border-b-4 last-of-type:border-table_header whitespace-nowrap hover:text-green-600"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames("py-2 px-4", {
                    "text-green-600": cell.getValue() === "Alive",
                    "text-red-600": cell.getValue() === "Dead",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PageController
        page={page}
        setPage={setPage}
        maxPages={data?.characters.info.pages}
      />
      {characterData && open && (
        <Modal onClose={setOpen} open={open}>
          <CharacterModal character={characterData.character} />
        </Modal>
      )}
    </>
  );
};

export default CharactersTable;
