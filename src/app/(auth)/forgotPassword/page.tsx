"use client" 

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from "lucide-react"

import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';

const loginFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
})

export default function ForgotPassword() {
  const router = useRouter();
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
    const login = await signIn({ email: data.email, password: data.password });
        
    if (login.error) {
      switch (login.code) {
        case 'sessions.method.facebook':
          addToast({
            type: "error",
            title: "Login error",
            description: "Your account was created by Facebook, use it to login!",
          });
          break;

        case 'sessions.method.google':
          addToast({
            type: "error",
            title: "Login error",
            description: "Your account was created by Google, use it to login!",
          });
          break;
      
        default:
          addToast({
            type: "error",
            title: "Erro de Autenticação",
            description: "Senha ou e-mail incorretos!",
          });
          break;
      } 
      
      return;
    } else {
        setTimeout(() => {
          router.push('/hinario');
        }, 1000);
    }
  }

  return (
    <div className="min-h-screen flex" >
      <div className='flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none lg:px-20 xl:px-24'>
        <div className='flex flex-col gap-2 mx-auto w-full max-w-sm'>
          <div>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">Esqueci minha senha</h3>
            <h3 className="scroll-m-20 text-sm tracking-tight">Um link será enviado para seu e-mail, onde poderá gerar uma nova senha.</h3>
          </div>
          <form 
            className='flex flex-col gap-4 min-w-[20rem]' 
            onSubmit={handleSubmit(login)}
          >
            <Input 
              title='E-mail'
              type="email" 
              error={errors.email?.message}
              {...register("email")}
            />
            <Button size="sm">
              <div className='flex gap-2 justify-center items-center'>
                <MailIcon />
                <p>Enviar</p>
              </div>
            </Button>
            <div className='flex flex-col gap-2'>
              <p className='text-xs'>Voltar para o <Link className='text-red-primary hover:underline' href="/login">login</Link></p>
            </div>
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
