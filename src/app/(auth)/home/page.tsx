"use client"

import { NavigationHeaderButtons } from "@/components/NavigationHeaderButtons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated])
  
  return (
    <div className="min-h-screen bg-red-primary" >
      <NavigationHeaderButtons user={user} />
    </div>
  )
}
