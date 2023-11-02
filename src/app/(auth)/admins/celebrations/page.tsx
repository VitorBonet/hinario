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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Celebration from "@/components/Admins/Pages/Celebration"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { ColumnSort } from "@/components/DataTable/ColumnSort"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable/DataTable"
import { api } from "@/services/apiClient"
import { useToast } from '@/contexts/ToastContext'

interface ICelebrations {
  id: string;
  description: string;
}
export default function Years() {
  const { addToast } = useToast();
  const [data, setData] = useState<ICelebrations[]>([]);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const deleteOption = async () => {
    const response = await api.delete(`/admins/celebrations/${deleteId}`);
    if (response.status == 200) {
      addToast({
        type: "success",
        title: "Sucesso",
        description: "Item deletado com sucesso!",
      });
      return;
    } else {
        addToast({
          type: "error",
          title: "Erro",
          description: "Não foi possível finalizar a operação, tente novamente mais tarde!",
        });
    }
  }

  const columns: ColumnDef<ICelebrations>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "description",
      header: ({ column }) => <ColumnSort column={column} title="Descrição" />,
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
              <Link href={`/admins/celebrations/${item.id}`}><DropdownMenuItem>Editar</DropdownMenuItem></Link>
              <DropdownMenuItem onClick={() => {
                setAlertDialogOpen(true);
                setDeleteId(item.id);
              }}>Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const getDataItem = async () => {
    const response = await api.get('/admins/celebrations/');
    setData(response.data);
  }

  useEffect(() => {
    getDataItem();
  }, []);

  return (
    <div className="container pt-20 flex flex-col gap-4 justify-around w-full" >
      <div>
        <Link href="/admins/celebrations/add" ><Button variant="default" size="sm">+ Novo</Button></Link>
      </div>
      <DataTable 
        columns={columns}
        data={data}
      />
      
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você esté deletando uma opção, não será possível recuperar posteriormente.
              Além disso todos os locais que utilizam essa opção serão deletados junto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteOption()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
