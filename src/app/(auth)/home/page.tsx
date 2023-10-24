"use client"

import { NavigationHeaderButtons } from "@/components/NavigationHeaderButtons";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="min-h-screen bg-red-primary" >
      <NavigationHeaderButtons user={user} />
      <h1>teste</h1>
    </div>
  )
}
