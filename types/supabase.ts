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
