import { ToastProvider } from '@/contexts/ToastContext'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'e-nario',
  description: 'Crie Repertórios Litúrgicos: Cifras e Melodias para Músicos da Igreja.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ToastProvider>
  )
}
