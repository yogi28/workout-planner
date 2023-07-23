'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import SideBar from './Sidebar';
import CommonButton from '@/components/CommonButton';
import fetchDashboardData from './fetchDashboardData';
import error from 'next/error';
import { ExerciseCard } from '@/types/exercises';
import { Workout } from '@/types/workout';
import OnboardingModal from './OnboardingModal';

function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchTermExercise, setSearchTermExercise] = useState('');
  const [searchTermWorkout, setSearchTermWorkout] = useState('');
  const [allExercises, setExercises] = useState<ExerciseCard[]>([]);
  const [allWorkouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredExercises, setfilteredExercises] = useState<ExerciseCard[]>([]);
  const [filteredWorkouts, setfilteredWorkouts] = useState<Workout[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [showWorkouts, setShowWorkouts] = useState(false);

  const handleSearchChangeExercises = (e: any) => {
    setSearchTermExercise(e.target.value);
    filterExercises(e.target.value);
  };

  const filterExercises = (searchTermExercise: string) => {
    const filtered = allExercises.filter((exercise) =>
        exercise.exercise_name.toLowerCase().includes(searchTermExercise.toLowerCase())
    );
    setfilteredExercises(filtered);
  };

  const handleSearchChangeWorkouts = (e: any) => {
    setSearchTermWorkout(e.target.value);
    filterWorkouts(e.target.value);
  };

  const filterWorkouts = (searchTermWorkout: string) => {
    const filtered = allWorkouts.filter((workout) =>
      workout.name.toLowerCase().includes(searchTermWorkout.toLowerCase())
    );
    setfilteredWorkouts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      // await Promise.all([fetchExercises(), fetchWorkouts()])
      const  { data, err } = await fetchDashboardData()

      if (err) alert(err)
      console.log(data)

      if (data.user_preferences.onboarded === false) {
        setShowOnboarding(true)
      }
      if (data.exercises && data.exercises.length > 0) {
        setExercises(data.exercises);
        setfilteredExercises(data.exercises);
      } else throw error; 

      if (data.workouts ) {
          setWorkouts(data.workouts)
          setfilteredWorkouts(data.workouts) }
      else
          throw error  

      setIsLoading(false)
    }
  
    fetchData()
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
    <>
    <OnboardingModal isOpen={showOnboarding} closeModal={() => setShowOnboarding(false)}/>
    <div className="px-4 py-8 dark:text-white flex">
      <div className="w-1/6"></div>
      <div className="w-4/6">
        <div className="flex mb-8">
          <h1 className="text-4xl font-bold flex-auto">Workout Planner</h1>
          <CommonButton
            _handleClick={() => setShowWorkouts(true)}
            _text="My Workouts!"
          />
          <CommonButton _handleClick={createNewWorkout} _text="New Workout" />
        </div>
        <div className="mb-8">
          {showWorkouts ? (
            <input
              type="text"
              placeholder="Search workouts"
              className="w-full py-2 px-4 rounded-md border border-gray-300 text-gray-500 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              value={searchTermWorkout}
              onChange={handleSearchChangeWorkouts}
            />
          ) : (
            <input
              type="text"
              placeholder="Search exercises"
              className="w-full py-2 px-4 rounded-md border border-gray-300 text-gray-500 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              value={searchTermExercise}
              onChange={handleSearchChangeExercises}
            />
          )}
        </div>
        {isLoading && <p> Loading ...</p>}
        {!isLoading &&
          (showWorkouts ? (
            filteredWorkouts.length === 0 ? (
              <p className="text-lg">No workouts found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWorkouts.map((wr) => (
                  <div key={wr.name}>
                    <WorkoutCardComponent {...wr} />
                  </div>
                ))}
              </div>
            )
          ) : filteredExercises.length === 0 ? (
            <p className="text-lg">No exercises found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.exercise_name}
                  onClick={() => showSidebar && addOrRemove(ex.exercise_id)}
                  className={
                    selectedExercises.includes(ex.exercise_id) ? "ring-2" : ""
                  }
                >
                  <ExerciseCardComponent {...ex} disableClick={showSidebar} />
                </div>
              ))}
            </div>
          ))}
      </div>
      {showSidebar && (
        <div className="w-1/6">
          <SideBar
            selectedIds={selectedExercises}
            allExercises={filteredExercises}
            onCreateWorkout={(workout) =>
              setWorkouts([workout, ...allWorkouts])
            }
          />
        </div>
      )}
    </div>
    </>
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

function WorkoutCardComponent(props: Workout) {

  return (
      <Link
        className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground dark:border-gray-600 "
        href={`/dashboard/exercises/${props.workout_id}`}
        // target="_blank"
        rel="noreferrer"
        >
        <h3 className="font-bold mb-2 min-h-[40px] lg:min-h-[60px]">{props.name}</h3>
        <div className="flex flex-col grow gap-4 justify-between">
            <p className="text-sm opacity-70">{props.exercises}</p>
        </div>
      </Link>)
}
export default HomePage;
