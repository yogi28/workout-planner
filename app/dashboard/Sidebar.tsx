'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/dist/server/api-utils';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)
  
type Exercise = Database["public"]["Tables"]["exercises"]["Row"]
type ExerciseCard = {
      exercise_id: Exercise['exercise_id']
      exercise_name: Exercise['exercise_name']
      difficulty_level: Exercise['difficulty_level']
      image: Exercise['image']
      muscle_group: Exercise['muscle_group']
}


export default function SideBar({selectedIds, allExercises, onCreateWorkout}: {selectedIds: number[], allExercises: ExerciseCard[], onCreateWorkout: () => void}) {
    const supabase = createClientComponentClient<Database>()
    const currentTimeStamp = ((new Date()).toISOString());

    const [workoutName, setWorkoutName] = useState('')

    const createMyWorkout = async () => {
        console.log(currentTimeStamp, selectedIds, workoutName)
        const {
            data: { user },
          } = await supabase.auth.getUser()
        
        if (!user){
            alert("No User")
        } else {
            const { error } = await supabase
                .from('workout')
                .insert([
                { user_id: user?.id, inserted_at: currentTimeStamp, updated_at: currentTimeStamp, exercises: selectedIds, name: workoutName },
                ])
                console.log(error)
                if(!error)
                    onCreateWorkout()
            }
        
    }

    return (
        <div>
            <div className="flex-1 flex flex-col justify-center gap-2 text-foreground">
            <label className="text-md mx-6">
                Name your Workout
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6 mx-4"
                name="email"
                onChange={(e) => setWorkoutName(e.target.value)}
                value={workoutName}
                placeholder="My workout Name"
            />
            </div>
            <div>
            {selectedIds.length === 0 ? (
                    <p className="text-lg p-6">Please select exercise!</p>
                ) : (
                    <div className="w-full">
                    {selectedIds.map((id) => (
                    <div key={id} className='p-6'>
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow mb-4 p-4">
                            <h3 className="text-lg font-semibold">{id}</h3>
                            <p>Exercise Id: {id}</p>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none mt-2">
                                Close
                            </button>
                        </div>
                    </div>
                    ))}
                    </div>
                )}
            </div>
        <button onClick={createMyWorkout} className='mx-6 bg-foreground hover:bg-background py-2 px-4 rounded-lg font-mono text-sm text-background hover:text-foreground border hover:border-foreground'>Create My Workout</button>
      </div>
    )
  }