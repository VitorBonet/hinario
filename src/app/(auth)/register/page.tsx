"use client" 

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { FaFacebook } from "react-icons/fa"

import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import { api } from '@/services/apiClient';

const loginFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório'),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  phone: z.string()
    .nonempty('O nome é obrigatório'),
  parish: z.string()
    .nonempty('Código da paróquia é obrigatório'),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
})

export default function Register() {
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
    try {
      const response = await api.post("/users", {
        name: data.name, 
        email: data.email, 
        password: data.password,
        phone: data.parish,
        parish: data.parish,
      });

      if (response.data.id) {
        addToast({
          type: "success",
          title: "Usuário criado com sucesso",
          description: "Seu usuário foi criado com sucesso!",
        });
      }
      router.push('/login');
    } catch (err: any) {
      switch (err?.code) {
        case 'users.create.exists':
          addToast({
            type: "error",
            title: "Erro ao criar usuário",
            description: "Já existe um usuário com esse e-mail!",
          });
          break;

        case 'users.create.parish.exists':
          addToast({
            type: "error",
            title: "Erro ao criar usuário",
            description: "O código da paróquia utilizado não é válido.",
          });
          break;
      
        default:
          addToast({
            type: "error",
            title: "Erro ao criar usuário",
            description: "Ocorreu um erro, tente novamente mais tarde.",
          });
          break;
      } 
    }
  }

  return (
    <div className="min-h-screen flex" >
      <div className='flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none lg:px-20 xl:px-24'>
        <div className='flex flex-col gap-2 mx-auto w-full max-w-sm'>
          <div>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">Criar conta</h3>
          </div>
          <form 
            className='flex flex-col gap-4 min-w-[20rem]' 
            onSubmit={handleSubmit(login)}
          >
            <Input 
              title='Nome'
              error={errors.name?.message}
              {...register("name")}
            />
            <Input 
              title='E-mail'
              type="email" 
              error={errors.email?.message}
              {...register("email")}
            />
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
            <Input 
              title='Telefone'
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input 
              title='Código da Paróquia'
              error={errors.parish?.message}
              {...register("parish")}
            />
            <Button size="sm">Criar</Button>
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
          {/* <h4 className="scroll-m-20 text-xm tracking-tight text-gray-400">
            Ferramenta de idealização da
          </h4>
          <h4 className="scroll-m-20 text-xm tracking-tight text-gray-400">
            animação da celebração
          </h4> */}
        </div>
      </div>
    </div>
  )
}
