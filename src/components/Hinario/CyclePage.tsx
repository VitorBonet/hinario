"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'

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
import { Skeleton } from "../ui/skeleton"
 
const FormSchema = z.object({
  cycle: z.string({
    required_error: "Você precisa selecionar uma opção.",
  }),
})

export function CyclePage() {
  const { page, cycles, selectParameters, nextPage, backPage } = useRepertoire();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    selectParameters({ cycleId: data.cycle });
    nextPage();
  }

  return (
    <div className="pt-14 flex justify-around" >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 w-2/4">
              <div className="flex flex-col">
                    <div className="mt-10">
                      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">SELECIONE O CICLO</h1>
                      <h3>TEMPO LITÚRGICO</h3>
                      <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="cycle"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1 accent-white"
                              >
                                {cycles.length === 0 ? (
                                  <>
                                  <Skeleton className="w-32 h-4" />
                                  <Skeleton className="w-32 h-4" />
                                  <Skeleton className="w-32 h-4" />
                                  </>
                                ) : (
                                  <>
                                  {cycles.map(cycle => (
                                    <FormItem key={cycle.id} className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={cycle.id.toString()} />
                                      </FormControl>
                                      <FormLabel className="font-normal">{cycle.description}</FormLabel>
                                    </FormItem>
                                  ))}
                                  </>
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                    </div>
              </div>
              <div className="flex w-full justify-between">
                <Button variant="ghost" onClick={backPage}><AiOutlineDoubleLeft /> Voltar</Button>
                <Button variant="ghost" type="submit">Proximo <AiOutlineDoubleRight /></Button>
              </div>
            </form>
          </Form>

      <div className="bg-red-secondary h-full w-full min-h-screen max-w-sm mr-10 -mt-10 pt-10" >
        <div className="p-6 flex flex-col gap-2">
          <h3>TEMPO LITÚRGICO</h3>
          <p className="scroll-m-20 text-sm tracking-tight"> 
          O objetivo do tempo litúrgico é permitir que os fiéis mergulhem profundamente na história da salvação, 
          revivendo e refletindo sobre os principais eventos da vida de Cristo e sua relevância espiritual. 
          Cada período litúrgico tem suas próprias práticas, símbolos e cores litúrgicas para ajudar os crentes 
          a se conectar mais profundamente com sua fé e sua jornada espiritual.
          </p>
        </div>
      </div>
    </div>
  )
}
