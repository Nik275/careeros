import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AssessmentProvider } from '@/contexts/assessment-context'

async function getUser() {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export default async function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side auth check - same as dashboard
  const user = await getUser()

  if (!user) {
    redirect('/login?redirect=/assessment')
  }

  return (
    <AssessmentProvider initialUser={user}>
      {children}
    </AssessmentProvider>
  )
}
