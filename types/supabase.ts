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
