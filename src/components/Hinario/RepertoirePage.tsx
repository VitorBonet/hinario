"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AiOutlinePlus, AiOutlineDoubleLeft } from 'react-icons/ai'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useToast } from '@/contexts/ToastContext';
import { api } from "@/services/apiClient"
import { Input } from "@/components/ui/input"

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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { useRepertoire } from "@/contexts/RepertoireContext"
import { RepertoireSelectMusic } from "./RepertoireSelectMusic"
 
const FormSchema = z.object({
  title: z.string().nonempty('Titulo é obrigatório'),
})

export function RepertoirePage() {
  const { addToast } = useToast();
  const { parameter, celebrationsParts, repertoire, setRepertoire, createRepertoire, backPage } = useRepertoire();
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false)
  
  const saveModalRepertoire = () => { setAlertDialogOpen(true) }

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });
  
  async function handleCreate(newData: any) {
      if(repertoire) {
        const newRepo = {...repertoire, title: newData.title};
        setRepertoire(newRepo);
        const created = await createRepertoire(newRepo);
        if (created) {
          addToast({
            type: "success",
            title: "Sucesso",
            description: "Repertório criado com sucesso!",
          });
        } else {
          addToast({
            type: "error",
            title: "Erro",
            description: "Não foi possível finalizar a operação, tente novamente mais tarde!",
          });
        }
      }
      
      setAlertDialogOpen(false);
      return;
  }

  return (
    <div className="pt-14 flex justify-around bg-white text-black" >
      <div className="space-y-6 mt-6 w-2/4 pb-12" >
        <div className="flex w-full justify-between">
          <Button variant="ghost" onClick={backPage}><AiOutlineDoubleLeft /> Voltar</Button>
          {/* <Button variant="ghost" type="submit">Proximo <AiOutlineDoubleRight /></Button> */}
        </div>
        <div className="flex flex-col">
              <div className="mt-10 flex flex-col gap-4">
                {celebrationsParts.map(cp => ( <RepertoireSelectMusic celebrationPart={cp} /> ))}
              </div>
        </div>
      </div>

      <div className="bg-red-secondary w-full min-h-screen max-w-sm mr-10 -mt-10 pt-10 text-white" >
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-2x1 tracking-tight">Ano: {celebrationsParts[0]?.yearId}</h3>
            <h3 className="text-2x1 tracking-tight">Ciclo: {celebrationsParts[0]?.cycle?.description}</h3>
            <h3 className="text-2x1 tracking-tight">Celebração: {celebrationsParts[0]?.celebration?.description}</h3>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold tracking-tight">ESTRUTURA</h1>
            <h3 className="text-sm tracking-tight">MÓDULOS DA CELEBRAÇÃO</h3>
          </div>
          {celebrationsParts.map(cp => (
            <div className="flex flex-col">
              <h3 className="text-2x1 font-semibold tracking-tight">{cp.part.description}</h3>
              { repertoire?.repertoireCelebrationPartMusic.find(music => music && music.celebrationPartMusic && music.celebrationPartMusic?.celebrationPartId === cp.id)?.celebrationPartMusic.music.title ? (
                <h3 className="text-2x1 font-semibold tracking-tight">{repertoire?.repertoireCelebrationPartMusic.find(music => music.celebrationPartMusic?.celebrationPartId === cp.id)?.celebrationPartMusic.music.title}</h3>
              ) : (
                <h3 className="text-2x1 font-semibold tracking-tight">-</h3>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <Button className="rounded-full" variant="secondary" onClick={saveModalRepertoire}>Salvar Repertório</Button>
          </div>
        </div>
      </div>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <form className='flex flex-col gap-4 min-w-[20rem]' onSubmit={handleSubmit(handleCreate)}>
            <AlertDialogHeader>
              <AlertDialogTitle>Salvar Repertório</AlertDialogTitle>
              <AlertDialogDescription>
                  <div className="flex gap-4">
                    <Input 
                      title='Titulo'
                      type="title" 
                      error={errors.title?.message}
                      {...register("title")}
                    />
                  </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button>Salvar</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
