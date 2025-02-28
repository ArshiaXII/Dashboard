"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabase"
import type { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js"

type Table = "properties" | "blog_posts" | "inquiries" | "users"
type Event = "INSERT" | "UPDATE" | "DELETE" | "*"

export function useSupabaseRealtime<T = any>(
  table: Table,
  event: Event = "*",
  callback?: (payload: RealtimePostgresChangesPayload<T>) => void,
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    // Create a new realtime subscription
    const newChannel = supabase
      .channel(`public:${table}`)
      .on("postgres_changes", { event, schema: "public", table }, (payload) => {
        if (callback) {
          callback(payload as RealtimePostgresChangesPayload<T>)
        }
      })
      .subscribe()

    setChannel(newChannel)

    // Cleanup subscription on unmount
    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel)
      }
    }
  }, [table, event, callback])

  return channel
}

export function useSupabaseQuery<T = any>(
  query: () => Promise<{ data: T | null; error: Error | null }>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data, error } = await query()
        if (error) {
          setError(error)
        } else {
          setData(data)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [...dependencies, query])

  return { data, error, loading }
}

