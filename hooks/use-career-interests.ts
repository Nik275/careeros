'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CareerInterest } from '@/types/auth'

export function useCareerInterests() {
  const [interests, setInterests] = useState<CareerInterest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    async function fetchInterests() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('career_interests')
          .select('*')
          .order('name')

        if (error) throw error

        setInterests(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch interests')
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterests()
  }, [supabase])

  return { interests, isLoading, error }
}