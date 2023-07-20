'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function DashboardButton() {
    const router = useRouter()

    const supabase = createClientComponentClient()

    const handleClick = async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession()
    
        if (!session) {
            // this is a protected route - only users who are signed in can view this route
            router.push('/login')
        }
    
        const {
            data: { user },
        } = await supabase.auth.getUser()
    
        if (user == null)
            router.push('/login')

        router.push("/dashboard")
        
    }

    return (
        <button
            className="bg-foreground py-2 px-4 rounded-lg font-mono text-sm text-background"
            onClick={handleClick}
        >
            My Dashboard!
        </button>
  )
}
