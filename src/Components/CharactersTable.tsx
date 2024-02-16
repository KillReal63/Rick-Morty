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
  console.log(characters);

  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    characters && (
      <>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
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
