'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

function HomePage() {

  const supabase = createClientComponentClient<Database>()

  const [searchTerm, setSearchTerm] = useState('');
  const [allExercises, setExercises] = useState<ExerciseCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredExercises, setfilteredExercises] = useState<ExerciseCard[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    filterExercises(e.target.value);
  };

  const filterExercises = (searchTerm: string) => {
    const filtered = allExercises.filter((exercise) =>
        exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredExercises(filtered);
  };

  const fetchExercises = async () => {
    setIsLoading(true)
    let { data: exercises, error } = await supabase
    .from('exercises')
    .select('exercise_id, exercise_name, difficulty_level, image, muscle_group')

    if (exercises && exercises.length > 0) {
        setExercises(exercises)
        setfilteredExercises(exercises) }
    else
        throw error
    
    setIsLoading(false)
  };

  useEffect(() => {
    fetchExercises()
  }, []);

  const createNewWorkout = () => {
    setShowSidebar(true)
  }

  const addOrRemove = (id: number) => {
    if (selectedExercises.includes(id)){
      const index = selectedExercises.indexOf(id)
      let copySelectedExercises = [...selectedExercises]
      const _updatedExercises = copySelectedExercises.splice(index, 1)
      setSelectedExercises(copySelectedExercises)
    } else {
      setSelectedExercises(selectedExercises.concat([id]))
    }
  }

  return (
    <div className="px-4 py-8 dark:text-white flex">
      <div className='w-1/6'></div>
      <div className='w-4/6'>
        <div className='flex mb-8'>
          <h1 className="text-4xl font-bold flex-auto">Workout Planner</h1>
          <button onClick={createNewWorkout} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>New Workout</button>
        </div>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search workouts"
            className="w-full py-2 px-4 rounded-md border border-gray-300 text-gray-500 dark:border-gray-600 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
          {isLoading && <p> Loading ...</p>}
          {!isLoading && (
              filteredExercises.length === 0 ? (
                  <p className="text-lg">No workouts found.</p>
              ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredExercises.map((ex) => (
                    <div key={ex.exercise_name} onClick={() => showSidebar && addOrRemove(ex.exercise_id)} className={selectedExercises.includes(ex.exercise_id) ? "ring-2" : ""}>
                      <ExerciseCardComponent {...ex}
                        disableClick={showSidebar}
                      />
                    </div>
                  ))}
                  </div>
              ))}
      </div>
      {showSidebar && 
      <div className='w-1/6'>
          <SideBar selectedIds={selectedExercises} allExercises={filteredExercises} />
      </div>
      }
    </div>
  );
}

type ExerciseCardProps = ExerciseCard & {
  disableClick: boolean
}

function ExerciseCardComponent(exerciseCardProps: ExerciseCardProps) {

  return (
      <Link
        className={"relative flex flex-col group rounded-lg border p-6 hover:border-foreground dark:border-gray-600 " + (exerciseCardProps.disableClick ? " pointer-events-none" : "")}
        href={`/dashboard/exercises/${exerciseCardProps.exercise_id}`}
        // target="_blank"
        rel="noreferrer"
        >
        <h3 className="font-bold mb-2 min-h-[40px] lg:min-h-[60px]">{exerciseCardProps.exercise_name}</h3>
        <div className="flex flex-col grow gap-4 justify-between">
            <p className="text-sm opacity-70">{exerciseCardProps.muscle_group}</p>
        </div>
      </Link>)
}

function SideBar({selectedIds, allExercises}: {selectedIds: number[], allExercises: ExerciseCard[]}) {
  return (
    <div>
      {selectedIds.length === 0 ? (
            <p className="text-lg p-6">Please select exercise!</p>
        ) : (
            <div className="w-full">
            {selectedIds.map((id) => (
              <div key={id} className='p-6'>
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow mb-4 p-4">
                <h3 className="text-lg font-semibold">{id}</h3>
                <p>{id} content</p>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none mt-2">
                  Close
                </button>
              </div>
              </div>
            ))}
            </div>
        )}
    </div>
  )
}
export default HomePage;
