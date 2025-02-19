"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  TableOptions,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  Edit,
  Trash,
  Plus,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

// Shadecn Card components for the overlay cards
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

// Define your Admin type.
export type Admin = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  
};

// Define the meta callbacks type.
type TableMeta = {
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
  onView: (admin: Admin) => void;
};

const initialData: Admin[] = [
  {
    id: "m5gr84i9",
    name: "John Doe",
    email: "ken99@yahoo.com",
    mobile: "1234567890",
   
  },
  {
    id: "3u1reuv4",
    name: "Alice Smith",
    email: "Abe45@gmail.com",
    mobile: "9876543210",
   
  },
  {
    id: "derv1ws0",
    name: "Michael Brown",
    email: "Monserrat44@gmail.com",
    mobile: "7418529630",
    
  },
];

export const columns: ColumnDef<Admin>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: () => <div className="text-right ">Mobile No.</div>,
    cell: ({ row }) => {
      const mobile = row.getValue<string>("mobile");
      const formattedMobile = mobile.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      );
      return <div className="font-medium text-right">{formattedMobile}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="mr-16 text-right">Action</div>,
    cell: ({ row, table }) => {
      const admin = row.original;
      return (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            onClick={() => (table.options.meta as TableMeta).onView(admin)}
          >
            <Eye className="text-blue-700" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => (table.options.meta as TableMeta).onEdit(admin)}
          >
            <Edit className="text-green-600"/>
          </Button>
          <Button
            variant="ghost"
            onClick={() => (table.options.meta as TableMeta).onDelete(admin)}
          >
            <Trash className="text-red-600"/>
          </Button>
        </div>
      );
    },
  },
];

export function AdminTable() {
  const [data, setData] = React.useState<Admin[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // States for overlay cards
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [editingAdmin, setEditingAdmin] = React.useState<Admin | null>(null);
  const [viewingAdmin, setViewingAdmin] = React.useState<Admin | null>(null);

  // Define the table options using our meta type.
  const table = useReactTable<Admin>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onEdit: (admin: Admin) => {
        setEditingAdmin(admin);
        setIsEditOpen(true);
      },
      onDelete: (admin: Admin) => {
        if (window.confirm(`Are you sure you want to delete ${admin.name}?`)) {
          setData((prev) => prev.filter((p) => p.id !== admin.id));
        }
      },
      onView: (admin: Admin) => {
        setViewingAdmin(admin);
        setIsViewOpen(true);
      },
    },
  });

  const handleAddField = () => {
    setIsAddOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAdmin) return;
    const formData = new FormData(e.currentTarget);
    const updatedAdmin: Admin = {
      ...editingAdmin,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      
    };

    setData((prev) =>
      prev.map((p) => (p.id === updatedAdmin.id ? updatedAdmin : p))
    );
    setIsEditOpen(false);
    setEditingAdmin(null);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAdmin: Admin = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      
    };

    setData((prev) => [...prev, newAdmin]);
    setIsAddOpen(false);
  };

  return (
    <><div className="mb-10 -mt-10 text-xl font-bold z-1 text-[#611010]">ADMIN MANAGEMENT</div>
    <div className="w-full">
      <div className="flex items-center justify-between py-4 space-x-2">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-start">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" onClick={handleAddField} className="bg-blue-700 ">
          <Plus className="mr-2" /> Add
        </Button>
      </div>

      <div className="border rounded-md">
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
            {table.getRowModel().rows.length ? (
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

      {/* Edit Admin Card */}
      {isEditOpen && editingAdmin && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Admin</CardTitle>
              <CardDescription>
                Update the details for {editingAdmin.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <Input
                  name="name"
                  defaultValue={editingAdmin.name}
                  placeholder="Name"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  defaultValue={editingAdmin.email}
                  placeholder="Email"
                  required
                />
                <Input
                  name="mobile"
                  defaultValue={editingAdmin.mobile}
                  placeholder="Mobile (digits only)"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Admin Card */}
      {isAddOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Details</CardTitle>
              <CardDescription>
                Fill in the details to add a new Admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <Input name="name" placeholder="Name" required />
                <Input name="email" type="email" placeholder="Email" required />
                <Input
                  name="mobile"
                  placeholder="Mobile (digits only)"
                  required
                />
                <Input name="password" type="password" placeholder="Password" required />
                <Input name="cpassword" type="password" placeholder="Confirm Password" required />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">ADD</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

{isViewOpen && viewingAdmin && (
  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 text-xl text-white bg-gray-500 rounded-full">
            {viewingAdmin.name
              ? viewingAdmin.name
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")
              : ""}
          </div>
        </div>
        
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {viewingAdmin.name}
          </div>
          <div>
            <strong>Email:</strong> {viewingAdmin.email}
          </div>
          <div>
            <strong>Mobile:</strong> {viewingAdmin.mobile}
          </div>
          

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsViewOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}

    </div></>
  );
  
}