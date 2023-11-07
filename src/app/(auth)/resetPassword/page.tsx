"use client" 

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams  } from 'next/navigation';
import { FaFacebook } from "react-icons/fa"

import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import { api } from '@/services/apiClient';

const loginFormSchema = z.object({
  password: z.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
})

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginFormSchema)
  });

  async function login(data: any) {
    try {
      const token = searchParams.get('token')
      if (!token) {
        throw new Error();
      }

      await api.post("/password/reset", {
        password: data.password,
        confirmPassword: data.confirmPassword,
        token,
      });

      router.push('/login');
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao alterar senha",
        description: "Ocorreu um erro ao tentarmos alterar sua senha, tente novamente mais tarde.",
      });
    }
  }

  return (
    <div className="min-h-screen flex" >
      <div className='flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none lg:px-20 xl:px-24'>
        <div className='flex flex-col gap-2 mx-auto w-full max-w-sm'>
          <div>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">Alteração de senha</h3>
          </div>
          <form 
            className='flex flex-col gap-4 min-w-[20rem]' 
            onSubmit={handleSubmit(login)}
          >
            <Input 
              title='Senha'
              type="password" 
              {...register("password")}
            />
            <Input 
              title='Confirmação de senha'
              type="password" 
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <Button size="sm">Salvar</Button>
          </form>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1 bg-red-primary'>
        <div className='flex gap-4 h-full justify-center items-center'>
          <Image
            className=''
            src="/images/logo_gold.png"
            alt="Diocese de Joinville"
            width={100}
            height={100}
          />  
          <div className='flex justify-center items-center flex-col text-white'>
            <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">VENHA PREPARAR A </h3>
            <h1 className={`font-carabella text-7xl mt-[12px] `}>Celebração</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
