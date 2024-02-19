import { FC } from "react";
import { TCharacters } from "./CharactersSlider";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
        cell: (info) => info.getValue(),
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

type Props = {
  characters: TCharacters[];
};

const CharactersTable: FC<Props> = ({ characters }) => {
  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    characters && (
      <>
        <table className="border-collapse my-6 font text-base rounded-t-md overflow-hidden overflow-x-none">
          <thead className="bg-table_header text-white text-left font-bold scroll">
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
                className="border-solid border-b-2 even:bg-even last-of-type:border-b-4 last-of-type:border-table_header"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`py-3 px-4 ${
                      cell.getValue() === "Alive" ? "text-green-600" : null
                    } ${cell.getValue() === "Dead" ? "text-red-600" : null}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};

export default CharactersTable;
