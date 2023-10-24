import { useState } from 'react'
import { ArrowUpDown } from "lucide-react"

interface IColumnSortProps {
  column: any;
  title: string;
}

export function ColumnSort({ 
  column,
  title,
 }: IColumnSortProps) { 
  return (
    <div className="flex gap-2 cursor-pointer" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </div>
  )
}