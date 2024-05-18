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
    accessorKey: "dueBack",
    header: "Due Back",
    cell: ({ row }) => (
      <Input
        type="text"
        value={row.original.dueBack}
        onChange={(e) => row.original.setDueBack(e.target.value)}
      />
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button variant="outline" size="sm" onClick={() => handleCheckOut(row.original)}>
        Check Out
      </Button>
    ),
  },
];

// Sample data
const sampleData = [
  { item: "DELL CHARGER 13", dueBack: "" },
  { item: "Mr Peanut 4", dueBack: "" },
  { item: "TSCLAP-18", dueBack: "" },
  { item: "TSCLTL01", dueBack: "" },
  { item: "TSCLTL02", dueBack: "" },
  { item: "TSCLTL03", dueBack: "" },
  { item: "TSCLTL04", dueBack: "" },
  { item: "TSCLTL05", dueBack: "" },
];

// Function to handle checkout
const handleCheckOut = (laptop) => {
  // Perform checkout logic here
  alert(`Checking out ${laptop.item}...`);
};

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
