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

const columns = [
    {
      accessorKey: "pickup",
      header: "Pickup Date",
      cell: ({ row }) => row.getValue("pickup"),
    },
    {
      accessorKey: "person",
      header: "Person",
      cell: ({ row }) => row.getValue("person"),
    },
    {
      accessorKey: "equipment",
      header: "Equipment",
      cell: ({ row }) => row.getValue("equipment"),
    },
    {
      accessorKey: "approved",
      header: "Approved",
      cell: ({ row }) => row.getValue("approved") ? "Yes" : "No", // Convert boolean value to Yes/No
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
            onClick={() => alert(`Checked in ${reservation.person}`)}
            className="px-3 py-1 text-white bg-blue-500 rounded"

          >
            Check In
          </Button>
        );
      },
    },
  ];
  
  
function DataTableDemo() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // useEffect to fetch data when component mounts
  React.useEffect(() => {
    // Check if running on the client-side
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  // fetchData function fetches data from "/checkoutEquip.json"
  const fetchData = async () => {
    try {
      const response = await fetch("/checkoutEquip.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData.equipment);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useReactTable hook to handle table operations
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

  // Render loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state if an error occurred during data fetching
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the table with fetched data
  return (
    <div className="w-full">
      {/* Render search input for global filtering */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search across all fields..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      {/* Render table */}
      <div className="rounded-md border">
        <Table>
          {/* Render table header */}
          <TableHeader>
            {/* Map header groups */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Map headers */}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {/* Render header */}
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
          {/* Render table body */}
          <TableBody>
            {/* Check if there are rows */}
            {table.getRowModel().rows?.length ? (
              // Map rows
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {/* Map cells */}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {/* Render cell */}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Render "No results" if no rows
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

// Render DataTableDemo component
const upcomingReservation = () => {
  return (
    <div>
      <DataTableDemo />
    </div>
  );
};

export default upcomingReservation;
