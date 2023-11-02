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

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/contexts/ToastContext';
import { ICelebrationsDTOS } from "@/contexts/dtos/ICelebrationsDTOS"

const loginFormSchema = z.object({
  description: z.string()
  .nonempty('Descrição é obrigatória'),
})

interface ICelebrationProps {
  title: string;
  subtitle: string;
  data?: ICelebrationsDTOS;
}

export default function Celebration({
  title,
  subtitle,
  data,
}: ICelebrationProps) {
  const { addToast } = useToast();
  const router = useRouter()

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
    let response;
    if (data) {
      response = await api.put(`/admins/celebrations/${data.id}`, newData)
    } else {
      response = await api.post(`/admins/celebrations`, newData)
    }
        
    if (response.status == 200) {
      addToast({
        type: "success",
        title: "Sucesso",
        description: data ? "Celebração alterada com sucesso!" : "Celebração criada com sucesso!",
      });
      
      router.push('/admins/celebrations', { scroll: false })
      return;
    } else {
        addToast({
          type: "error",
          title: "Erro",
          description: "Não foi possível finalizar a operação, tente novamente mais tarde!",
        });
    }
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
      <CardContent>
          <div className="flex gap-4">
            <Input 
              title='Descrição'
              type="description" 
              error={errors.description?.message}
              {...register("description")}
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
