"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AiOutlinePlus, AiOutlineDoubleLeft } from 'react-icons/ai'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
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
import { IMusicDTOS } from "@/contexts/dtos/IMusicDTOS"
 
const FormSchema = z.object({
  cycle: z.string({
    required_error: "Você precisa selecionar uma opção.",
  }),
})

export function RepertoirePage() {
  const { parameter, celebrationsParts, nextPage, backPage } = useRepertoire();
  const [viewMusic, setViewMusic] = useState<IMusicDTOS | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <div className="pt-14 flex justify-around bg-white text-black" >
      <div className="space-y-6 mt-6 w-2/4" >
        <div className="flex w-full justify-between">
          <Button variant="ghost" onClick={backPage}><AiOutlineDoubleLeft /> Voltar</Button>
          {/* <Button variant="ghost" type="submit">Proximo <AiOutlineDoubleRight /></Button> */}
        </div>
        <div className="flex flex-col">
              <div className="mt-10 flex flex-col gap-4">
                {celebrationsParts.map(cp => (
                <>
                <div>
                  <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-primary">{cp.part.description}</h1>
                  <p className="scroll-m-20 text-sm tracking-tight"> 
                    {cp.part.description}
                  </p>
                </div>
                <div>
                  <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-red-primary">OPÇÕES</h3>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2 mt-2 min-w-fit">
                        <>
                        {cp.celebrationPartMusic.map(cptmMusic => (
                          <div key={cptmMusic.music.id} onClick={() => {setViewMusic(cptmMusic.music)}} className="bg-red-primary w-fit pl-4 pr-4 pb-2 pt-2 rounded-full text-white hover:bg-red-secondary cursor-pointer">
                            <p className="oll-m-20 text-sm">{cptmMusic.music.title}</p>
                          </div>
                        ))}
                        </>
                    </div>
                    <div className="w-full flex flex-col gap-4 ">
                      {viewMusic ? (
                        <>
                          <div className="flex items-center justify-between">
                            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">{viewMusic.title}</h1>
                            <div className="text-red-primary hover:text-red-secondary cursor-pointer"><AiOutlinePlus /></div>
                          </div>
                          <p className="text-sm tracking-tight max-h-48 overflow-auto"> 
                            <div dangerouslySetInnerHTML={{__html: viewMusic.lyrics}}></div>
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                </>
                ))}
              </div>
        </div>
      </div>

      <div className="bg-red-secondary h-full w-full min-h-screen max-w-sm mr-10 -mt-10 pt-10 text-white" >
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
              <h3 className="text-2x1 font-semibold tracking-tight">-</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
