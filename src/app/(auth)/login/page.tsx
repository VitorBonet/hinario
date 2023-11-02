"use client" 

import { useForm } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const loginFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

export default function Login() {
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
      <div className='flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none lg:px-20 xl:px-24'>
        <div className='flex flex-col gap-2 mx-auto w-full max-w-sm'>
          <div>
            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">Entrar no Hinário</h3>
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
            <Input 
              title='Senha'
              type="password" 
              {...register("password")}
            />
            <Button size="sm">Entrar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
