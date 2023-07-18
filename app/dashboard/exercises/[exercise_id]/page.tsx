import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../../../types/supabase'

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  )

async function getData(exercise_id: string) {
    let { data: exercise, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('exercise_id', exercise_id)

    return exercise
  };

export default async function Page({ params }: { params: { exercise_id: string } }) {

    const data = await getData(params.exercise_id)
    let exerciseData
    if (data && data[0]) {
        exerciseData = data[0] 
        return (

            <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Exercise Details</h1>
    
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white mb-2">{exerciseData.exercise_name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{exerciseData.exercise_description}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">Muscle Group:</span> {exerciseData.muscle_group}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">Equipment:</span> {exerciseData.equipment}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-semibold">Difficulty Level:</span> {exerciseData.difficulty_level}
                </p>
                <img
                    src={exerciseData.image || ""}
                    alt={exerciseData.exercise_name}
                    className="w-full h-auto mb-2"
                />
                <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Workout ID:</span> {exerciseData.workout_id}
                </p>
                </div>
            </div>
            </div>
        )
    }
    else {
        return <div></div>
    }
  }