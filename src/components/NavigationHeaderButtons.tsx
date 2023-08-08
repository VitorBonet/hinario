"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"

export function NavigationHeaderButtons() {
  return (
    <header className="fixed text-white bg-transparent supports-backdrop-blur:bg-background/80 top-0 z-40 w-full backdrop-blur">
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
        </div>

        
        <div>
          <Button variant="ghost">Entrar</Button>
        </div>
      </div>
    </header>
  )
}
