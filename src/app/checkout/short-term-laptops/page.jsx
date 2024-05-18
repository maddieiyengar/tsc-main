"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define columns for the table
const columns = [
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => row.getValue("item"),
  },
  {
    accessorKey: "reservePeriod",
    header: "Reservation Period",
    cell: ({ row }) => row.getValue("reservePeriod"),
  },
  {
    id: "actions",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Actions
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(`Check Out ${reservation.item}`)}
          className="px-3 py-1 text-white bg-blue-500 rounded"
        >
          Check Out
        </Button>
      );
    },
  },
];

const sampleData = [
    { item: "TSCART5-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART2-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART18-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART17-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART16-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART14-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART13-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART11-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART10-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART1-7440", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-15", reservePeriod: "3 hours reserve max", person: "P Rajput", dueDate: "5/9 11:00am" },
    { item: "TSCART-13", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-12", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-11", reservePeriod: "3 hours reserve max", person: "Jack Shelton", dueDate: "5/9 10:00am" },
    { item: "TSCART-09", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-08", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-07", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-04", reservePeriod: "3 hours reserve max" },
    { item: "TSCART-03", reservePeriod: "3 hours reserve max", person: "Brian Baker", dueDate: "5/31 10:00am" },
    { item: "TSCART-01", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-06", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-05", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-04", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-03", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-02", reservePeriod: "3 hours reserve max" },
    { item: "SLCCART-01", reservePeriod: "3 hours reserve max" },
    { item: "MAC CHARGER 6", reservePeriod: "3 hours reserve max" },
    { item: "Mac Charger - USBC", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc9", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc8", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc7", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc15", reservePeriod: "3 hours reserve max", person: "Douglas Smith", dueDate: "5/31 12:00pm" },
    { item: "LibrCirc14", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc13", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc11", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc10", reservePeriod: "3 hours reserve max" },
    { item: "LibrCirc1", reservePeriod: "3 hours reserve max" },
    { item: "DELL CHARGER 21", reservePeriod: "3 hours reserve max" },
  ];
  
function DataTableLaptops() {
  const [data, setData] = React.useState(sampleData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search across all fields..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const LaptopCheckinCheckoutPage = () => {
  return (
    <div>
      <DataTableLaptops />
    </div>
  );
};

export default LaptopCheckinCheckoutPage;
