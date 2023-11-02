"use client"

import { ToastProvider } from '@/contexts/ToastContext'
import { RepertoireProvider } from '@/contexts/RepertoireContext'
import type { Metadata } from 'next'
import { NavigationHeaderButtons } from '@/components/NavigationHeaderButtons'
import { useAuth } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: 'Vamos lá | e-nario',
  description: 'Crie Repertórios Litúrgicos: Cifras e Melodias para Músicos da Igreja.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <RepertoireProvider>
      <div className="min-h-screen h-full bg-red-primary text-white" >
        <NavigationHeaderButtons user={user} />
        <div>
          {children}
        </div>
      </div>
        
    </RepertoireProvider>
  )
}
