"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { api } from "@/services/apiClient"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { MoreHorizontal } from "lucide-react"

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/contexts/ToastContext';
import { IMusicDTOS } from "@/contexts/dtos/IMusicDTOS"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DataTable } from "@/components/DataTable/DataTable"
import { DataTableMusicNotes } from "@/components/DataTable/DataTableMusicNotes"

const loginFormSchema = z.object({
  title: z.string().nonempty('Titulo é obrigatório'),
  lyrics: z.string().nonempty('Letra é obrigatória'),
})

interface INotes {
  key: string;
  note: string;
  position: number;
}

interface IMusicProps {
  title: string;
  subtitle: string;
  data?: IMusicDTOS;
}

export default function Music({
  title,
  subtitle,
  data,
}: IMusicProps) {
  const { addToast } = useToast();
  const router = useRouter()
  const [notes, setNotes] = useState<INotes[]>([{ key: 'D', note: 'D', position: 12 }]);

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  async function handleCreate(newData: any) {
    console.log(newData);
    // let response;
    // if (data) {
    //   response = await api.put(`/admins/musics/${data.id}`, newData)
    // } else {
    //   response = await api.post(`/admins/musics`, newData)
    // }
        
    // if (response.status == 200) {
    //   addToast({
    //     type: "success",
    //     title: "Sucesso",
    //     description: data ? "Musica alterada com sucesso!" : "Musica criada com sucesso!",
    //   });
      
    //   router.push('/admins/musics', { scroll: false })
    //   return;
    // } else {
    //     addToast({
    //       type: "error",
    //       title: "Erro",
    //       description: "Não foi possível finalizar a operação, tente novamente mais tarde!",
    //     });
    // }
  }

  return (
    <Card className="w-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <form 
          className='flex flex-col gap-4 min-w-[20rem]' 
          onSubmit={handleSubmit(handleCreate)}
        >
      <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input 
              title='Titulo'
              type="title" 
              error={errors.title?.message}
              {...register("title")}
            />
            <Input 
              title='Audio'
              id="audio" 
              type="file" 
              error={errors.audio?.message}
              {...register("audio")}
            />
            <Input 
              title='Tablatura'
              id="tablatura" 
              type="file" 
              error={errors.tablatura?.message}
              {...register("tablatura")}
            />
          </div>
          <div>
            <DataTableMusicNotes notes={notes} setNotes={setNotes}/>
          </div>
          <div>
            <Textarea 
              title='Letra'
              error={errors.lyrics?.message}
              {...register("lyrics")}
            />
          </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Salvar</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
