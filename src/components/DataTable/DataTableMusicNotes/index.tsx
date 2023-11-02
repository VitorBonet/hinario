"use client"
 
import { Dispatch, SetStateAction, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnSort } from "@/components/DataTable/ColumnSort"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from './DataTable'

interface INotes {
  key: string;
  note: string;
  position: number;
}

interface IDataTableMusicNotesProps {
  notes: INotes[];
  setNotes: Dispatch<SetStateAction<INotes[]>>;
}

export function DataTableMusicNotes({notes, setNotes}: IDataTableMusicNotesProps) {
  
const columns: ColumnDef<INotes>[] = [
  {
    accessorKey: "key",
    header: "Tom",
  },
  {
    accessorKey: "note",
    header: "Nota",
  },
  {
    accessorKey: "position",
    header: "Posição",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      const deleteItem = (item: any) => {
        setNotes(notes.filter(note => note.key != item.note && note.note != item.note && note.position != item.position));
      }
 
      return (
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => deleteItem(item)}>
          <Trash className="h-4 w-4" />
        </Button>
      )
    },
  },
]

  return (
    <div>
      <div>
        {/* <Link href="/admins/parts/add" ><Button variant="default" size="sm">+ Novo</Button></Link> */}
      </div>
      <DataTable 
        columns={columns}
        data={notes}
      />
    </div>
  )
}