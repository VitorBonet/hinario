'use client'

import Link from 'next/link'
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import Part from "@/components/Admins/Pages/Part"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { ColumnSort } from "@/components/DataTable/ColumnSort"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable/DataTable"
import { api } from "@/services/apiClient"

interface IMusics {
  id: string;
  title: string;
}

export const columns: ColumnDef<IMusics>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnSort column={column} title="Titulo" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admins/musics/${item.id}`}><DropdownMenuItem>Editar</DropdownMenuItem></Link>
            <DropdownMenuItem>Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Years() {
  const [data, setData] = useState<IMusics[]>([]);

  const getDataItem = async () => {
    const response = await api.get('/admins/musics/');
    setData(response.data);
  }

  useEffect(() => {
    getDataItem();
  }, []);

  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div>
        <Link href="/admins/musics/add" ><Button variant="default" size="sm">+ Novo</Button></Link>
      </div>
      <DataTable 
        columns={columns}
        data={data}
      />
    </div>
  )
}
