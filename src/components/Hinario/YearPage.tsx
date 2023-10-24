"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AiOutlineDoubleRight } from 'react-icons/ai'

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
  year: z.enum(["A", "B", "C"], {
    required_error: "Você precisa selecionar uma opção.",
  }),
})

export function YearPage() {
  const { page, years, selectParameters, nextPage } = useRepertoire();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    selectParameters({ yearId: data.year });
    nextPage();
  }

  return (
    <div className="pt-14 flex justify-around" >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6 w-2/4">
              <div className="flex flex-col">
                    <div className="mt-10">
                      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">SELECIONE O ANO</h1>
                      <h3>ANO LITÚRGICO</h3>
                      <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1 accent-white"
                              >
                                {years.length === 0 ? (
                                  <>
                                  <Skeleton className="w-32 h-4" />
                                  <Skeleton className="w-32 h-4" />
                                  <Skeleton className="w-32 h-4" />
                                  </>
                                ) : (
                                  <>
                                  {years.map(year => (
                                    <FormItem key={year.id} className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={year.id.toString()} />
                                      </FormControl>
                                      <FormLabel className="font-normal">{year.description}</FormLabel>
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
              <div className="flex w-full justify-end">
                <Button variant="ghost" type="submit">Proximo <AiOutlineDoubleRight /></Button>
              </div>
            </form>
          </Form>

      <div className="bg-red-secondary h-full w-full min-h-screen max-w-sm mr-10 -mt-10 pt-10" >
        <div className="p-6 flex flex-col gap-2">
          <h3>ANO LITÚRGICO</h3>
          <p className="scroll-m-20 text-sm tracking-tight">
            O ano litúrgico é um ciclo de celebrações religiosas na Igreja Católica que reconta e comemora os principais eventos da vida de Jesus Cristo, 
            desde o seu nascimento até a sua ressurreição e sua futura vinda como Rei. Ele começa com o tempo do Advento, aproximadamente quatro semanas antes do Natal, 
            e termina com a Solenidade de Cristo Rei, no ano civil seguinte. O ano litúrgico é dividido em três ciclos: A, B e C, cada um dos quais se concentra em um dos 
            Evangelhos sinópticos (Mateus, Marcos e Lucas) e lê as principais passagens das Escrituras que narram a história da salvação. Essa divisão permite que os fiéis percorram, 
            ao longo dos anos, toda a vida de Jesus e compreendam a importância dos eventos religiosos em suas vidas. Além disso, os tempos litúrgicos ajudam os crentes a transcender o 
            tempo cronológico e entrar no "kairos", o tempo da graça de Deus, renovando a fé e a esperança na salvação.
          </p>
        </div>
      </div>
    </div>
  )
}
