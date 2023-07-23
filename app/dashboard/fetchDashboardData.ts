import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/supabase'
import { ExerciseCard } from '@/types/exercises'
import { Workout } from '@/types/workout'

export type DashboardData = {
    exercises: ExerciseCard[]
    workouts: Workout[]
    user_preferences: any
}

const fetchDashboardData = async () => {
    const supabase = createClientComponentClient<Database>()
    
    let data: DashboardData = {
        exercises: [],
        workouts: [],
        user_preferences: null,
    }

    let err = null
    
    const fetchUserPreferences = async () => {
        let { data: user_preferences, error } = await supabase
            .from('user_preferences')
            .select('onboarded')

        if (error || !user_preferences) {
            throw error
        }
        return user_preferences
    }

    const fetchExercises = async () => {
        let { data: exercises, error } = await supabase
            .from('exercises')
            .select('exercise_id, exercise_name, difficulty_level, image, muscle_group')
        if (error || !exercises) {
            throw error
        }
        return exercises
    };
    
    const fetchWorkouts = async () => {
        let { data: workouts, error } = await supabase
            .from('workout')
            .select('*')
        if (error || !workouts) {
            throw error
        }
        return workouts
    };

    try {
        const [userPreferences, exercises, workouts] = await Promise.all([
            fetchUserPreferences(),
            fetchExercises(),
            fetchWorkouts(),
        ])
        data.user_preferences = userPreferences[0]
        data.exercises = exercises
        data.workouts = workouts
    } catch (error) {
        err = error
    }
    
    return { data, err }
}

export default fetchDashboardData