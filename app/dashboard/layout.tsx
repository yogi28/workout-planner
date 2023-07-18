import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Header from "./header"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const supabase = createServerComponentClient({ cookies })
    
    const {
        data: { session },
    } = await supabase.auth.getSession()
    
    if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    if (user == null)
        redirect('/login')
        
    return (
      <section className="w-full">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Header user={user}/>
   
        {children}
      </section>
    )
  }