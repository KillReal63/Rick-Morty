import { FC, useState } from "react";
import { TCharacters } from "./CharactersSlider";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../Services/Queries";
import Modal from "./Modal";
import classNames from "classnames";
import CharacterModal from "./CharacterModal";

type Props = {
  characters: {
    info: { pages: number };
    results: TCharacters[];
  };

};

const CharactersTable: FC<Props> = ({ characters }) => {
 
  const [open, setOpen] = useState<boolean>(false);

  const [characterId, setCharacterId] = useState<number>(0);

  const { data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  const handleToggleModal = (id: number) => {
    setCharacterId(id);
    setOpen(!open);
  };

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: characters?.info.pages,
  });

  const pagination = {
    pageIndex,
    pageSize,
  };

 // console.log(pageIndex, pageSize);

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
              <>
                <button onClick={() => handleToggleModal(info.row.original.id)}>
                  {info.getValue()}
                </button>
              </>
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
          cell: (info) => info.getValue(),
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
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.type", {
          header: "Location Type",
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.dimension", {
          header: () => <span>Dimension</span>,
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("location.residents", {
          header: () => <span>First Resident</span>,
          cell: (info) => {
            const residents = info.getValue();
            return Array.isArray(residents) && residents.length > 0
              ? residents[0].name
              : "N/A";
          },
          footer: (info) => info.column.id,
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data: characters.results,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: true,
  });



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
                  className={classNames("py-3 px-4", {
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
      {data && open && (
        <Modal onClose={setOpen} open={open}>
          <CharacterModal character={data.character} />
        </Modal>
      )}
    </>
  );
};

export default CharactersTable;
