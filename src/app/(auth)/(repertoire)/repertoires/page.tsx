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
import { FileSignatureIcon, TrashIcon, Share2Icon } from "lucide-react"

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
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

import Celebration from "@/components/Admins/Pages/Celebration"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { ColumnSort } from "@/components/DataTable/ColumnSort"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable/DataTable"
import { api } from "@/services/apiClient"
import { useToast } from '@/contexts/ToastContext'
import { IRepertorioDTOS } from '@/contexts/dtos/IRepertorioDTOS'

interface ICelebrations {
  id: string;
  description: string;
}
export default function Repertoires() {
  const { addToast } = useToast();
  const [data, setData] = useState<IRepertorioDTOS[]>([]);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const deleteOption = async () => {
    // const response = await api.delete(`/admins/celebrations/${deleteId}`);
    // if (response.status == 200) {
    //   addToast({
    //     type: "success",
    //     title: "Sucesso",
    //     description: "Item deletado com sucesso!",
    //   });
    //   return;
    // } else {
    //     addToast({
    //       type: "error",
    //       title: "Erro",
    //       description: "Não foi possível finalizar a operação, tente novamente mais tarde!",
    //     });
    // }
  }

  const columns: ColumnDef<IRepertorioDTOS>[] = [
    {
      accessorKey: "id",
      header: "Id",
      size: 50,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <ColumnSort column={column} title="Titulo" />,
      enableSorting: true,
      size: 300,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <ColumnSort column={column} title="Criado" />,
      enableSorting: true,
      size: 50,
      cell: ({ row }) => {
        return <div>{format(row.getValue("createdAt"), 'Pp', { locale: ptBR })}</div>
      },
    },
    {
      id: "actions",
      size: 50,
      cell: ({ row }) => {
        const item = row.original
   
        return (
          <div>
            <Button variant="ghost" className="h-8 w-8 p-0" title="Editar">
              <FileSignatureIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" title="Deletar">
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" title="Compartilhar">
              <Share2Icon className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const getDataItem = async () => {
    // const response = await api.get('/admins/celebrations/');
    // setData(response.data);
    setData([
      { id: '1', title: 'Repertório 1', createdAt: new Date(), musics: [] },
      { id: '2', title: 'Repertório 2', createdAt: new Date(), musics: [] },
      { id: '3', title: 'Repertório 3', createdAt: new Date(), musics: [] },
      { id: '4', title: 'Repertório 4', createdAt: new Date(), musics: [] },
      { id: '5', title: 'Repertório 5', createdAt: new Date(), musics: [] },
      { id: '6', title: 'Repertório 6', createdAt: new Date(), musics: [] },
      { id: '7', title: 'Repertório 7', createdAt: new Date(), musics: [] },
      { id: '8', title: 'Repertório 8', createdAt: new Date(), musics: [] },
      { id: '9', title: 'Repertório 9', createdAt: new Date(), musics: [] },
      { id: '10', title: 'Repertório 10', createdAt: new Date(), musics: [] },
      { id: '11', title: 'Repertório 11', createdAt: new Date(), musics: [] },
      { id: '12', title: 'Repertório 12', createdAt: new Date(), musics: [] },
      { id: '13', title: 'Repertório 13', createdAt: new Date(), musics: [] },
      { id: '14', title: 'Repertório 14', createdAt: new Date(), musics: [] },
      { id: '15', title: 'Repertório 15', createdAt: new Date(), musics: [] },
      { id: '16', title: 'Repertório 16', createdAt: new Date(), musics: [] },
      { id: '17', title: 'Repertório 17', createdAt: new Date(), musics: [] },
    ])
  }

  useEffect(() => {
    getDataItem();
  }, []);

  return (
    <div className="container pt-20 flex flex-col gap-4 w-full h-screen bg-white text-black" >
      {/* <div>
        <Link href="/admins/celebrations/add" ><Button variant="default" size="sm">+ Novo</Button></Link>
      </div> */}
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
