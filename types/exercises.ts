import { Database } from "./supabase"

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"]
export type ExerciseCard = {
    exercise_id: Exercise['exercise_id']
    exercise_name: Exercise['exercise_name']
    difficulty_level: Exercise['difficulty_level']
    image: Exercise['image']
    muscle_group: Exercise['muscle_group']
}