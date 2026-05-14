export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          class_level: string | null
          career_interest: string | null
          subscription_plan: string
          assessment_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          class_level?: string | null
          career_interest?: string | null
          subscription_plan?: string
          assessment_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          class_level?: string | null
          career_interest?: string | null
          subscription_plan?: string
          assessment_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      career_interests: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          created_at?: string
        }
      }
      auth_attempts: {
        Row: {
          id: string
          email: string
          ip_address: string | null
          attempt_type: string
          success: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          ip_address?: string | null
          attempt_type: string
          success?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      check_auth_rate_limit: {
        Args: {
          p_email: string
          p_ip_address: string
          p_attempt_type: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      log_auth_attempt: {
        Args: {
          p_email: string
          p_ip_address: string
          p_attempt_type: string
          p_success: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}