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
      exercises: {
        Row: {
          difficulty_level: string | null
          equipment: string | null
          exercise_description: string | null
          exercise_id: number
          exercise_name: string
          image: string | null
          muscle_group: string
          workout_id: number | null
        }
        Insert: {
          difficulty_level?: string | null
          equipment?: string | null
          exercise_description?: string | null
          exercise_id: number
          exercise_name: string
          image?: string | null
          muscle_group: string
          workout_id?: number | null
        }
        Update: {
          difficulty_level?: string | null
          equipment?: string | null
          exercise_description?: string | null
          exercise_id?: number
          exercise_name?: string
          image?: string | null
          muscle_group?: string
          workout_id?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          instagram_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          instagram_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          instagram_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          age: number | null
          data: Json | null
          id: string
          location: string | null
          onboarded: boolean
        }
        Insert: {
          age?: number | null
          data?: Json | null
          id: string
          location?: string | null
          onboarded?: boolean
        }
        Update: {
          age?: number | null
          data?: Json | null
          id?: string
          location?: string | null
          onboarded?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout: {
        Row: {
          exercises: number[]
          inserted_at: string
          name: string
          updated_at: string
          user_id: string
          workout_id: number
        }
        Insert: {
          exercises: number[]
          inserted_at?: string
          name: string
          updated_at?: string
          user_id: string
          workout_id?: number
        }
        Update: {
          exercises?: number[]
          inserted_at?: string
          name?: string
          updated_at?: string
          user_id?: string
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
