"use client"

import * as React from "react"
import Link from "next/link"
import { BiSolidUser } from 'react-icons/bi'

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"
import { IUser } from "@/contexts/dtos/IUserDTOS"
import { UserButton } from "./NavigationHeader/UserButton"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from 'next/navigation';

interface INavigationHeaderButtonsProps {
  user?: IUser;
}

export function NavigationHeaderButtons({ user }: INavigationHeaderButtonsProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(router);
  }

  return (
    <header className="fixed text-white bg-red-primary supports-backdrop-blur:bg-background/80 top-0 z-40 w-full backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Hinário
          </h3>
        </div>

        <div className="flex flex-1 items-center justify-center space-x-2 md:justify-center">
          <Button variant="ghost">Comece Já</Button>
          <Button variant="ghost">Repertório</Button>
          <Button variant="ghost">Musicas</Button>
          <Button variant="ghost">Biblioteca</Button>

          <div>
            <div className="peer flex gap-2 py-2 items-center cursor-pointer">
              <p className="scroll-m-20 text-sm tracking-tight">Admin</p>
            </div>
                
            <div className="hidden rounded-sm peer-hover:flex hover:flex w-[200px] transition flex-col bg-white text-red-primary absolute top-11 text-sm">
              <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">Anos</a>
              <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">Ciclos</a>
              <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">Celebrações</a>
              <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">Partes da Celebração</a>
            </div>
          </div>
        </div>

        { user ? (
          <>
          <div className="peer flex gap-2 py-2 items-center">
            <p className="scroll-m-20 text-sm tracking-tight">
              <BiSolidUser />
            </p>

            <p className="scroll-m-20 text-sm tracking-tight">{user.name}</p>
          </div>
            
          <div className="hidden rounded-sm peer-hover:flex hover:flex w-[200px] transition fixed flex-col bg-white text-red-primary right-2 top-11 text-sm">
                <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">About Us</a>
                <a className="px-4 py-2 hover:bg-gray-200 rounded-sm" href="#">Contact Us</a>
                <a className="px-4 py-2 hover:bg-gray-200 rounded-sm cursor-pointer" onClick={handleSignOut}>Sair</a>
            </div>
          </>
        ) : (
          <div>
            <Button variant="ghost">Entrar</Button>
          </div>
        )}
      </div>
    </header>
  )
}
