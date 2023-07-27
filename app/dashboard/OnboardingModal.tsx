'use client'
import MyModal from "@/components/Modal"
import { FormEventHandler, JSX, ReactNode, useEffect, useState } from "react";

import { Profiles } from "@/types/profiles"
import { UserPreferences } from "@/types/user_preferences"

type Data = {
  weight: number | null
  height: number | null
  sex: "Male" | "Female" | "Others" 
  goal: 1 | 2 | 3 | null
  target_weight: number | null
  level: "Beginner" | "Intermediate" | "Advanced"
}

export type OnbaordingFormData = Omit<UserPreferences, "data"> & Profiles & Data
// type OnbaordingFormData = {
//   fullName: Profiles['full_name']
//   userName: Profiles['username']
//   instagramUrl?: Profiles['instagram_url']
//   location: UserPreferences['location']
//   age: UserPreferences['age']
//   preferences: Preferences
// }

const OnboardingModal = (modalProps: JSX.IntrinsicAttributes & { closeModal: () => void; isOpen: boolean; }) => {
    
    const [page, setPage] = useState(0)
    const [onboardingData, setOnboardingData] = useState<OnbaordingFormData>({
      age: null,
      height: null,
      weight: null,
      sex: "Male",
      goal: null,
      target_weight: null,
      level: "Beginner",
      id: "",
      location: null,
      onboarded: false,
      avatar_url: null,
      full_name: null,
      instagram_url: null,
      updated_at: null,
      username: null,
    })

    const updatePartialData = (partialData: Partial<OnbaordingFormData>) => {
        console.log("Partial Data: ", partialData)
        setOnboardingData({...onboardingData, ...partialData})
    }

    const nextFormPage = async () =>{
        if (page < 2) {
          setPage(page + 1)
        } else {
            alert("Submitting...")
            // save to db
            // User Preference Insertion
            // insertProfiles(user)

            // insertUserPrefs(user)

            // Profile Insertion

            // close modal
            modalProps.closeModal()
          }
    }

    useEffect(() => {
      if(page == 2){
        saveOnboardingData(onboardingData)
      }
        console.log("Onboarding Data", onboardingData)
    }, [onboardingData]);

    // const handleClick = () => {
    //     if (page < 2) {
    //         setPage(page + 1)
    //     } else {
    //         alert("Submitting...")
    //         // save to db
            
    //         // close modal
    //         modalProps.closeModal()
    //     }
    // }
    return (
      <>
        <MyModal title="Your fitness goals" {...modalProps}
          // action={
          //   <div className="flex justify-end">
          //   <button
          //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          //     onClick={handleClick}
          //   >
          //     {page === 2 ? "Submit" : "Next"}
          //   </button>
          //   </div>
          // }
        >
          <div className="text-white">{JSON.stringify(onboardingData)}</div>
          {page === 0 && <ProfileInformation updateData={updatePartialData} handleNextPage={nextFormPage}/>}
          {page === 1 && <Bio updateData={updatePartialData} handleNextPage={nextFormPage}/>}
          {page === 2 && <ExperienceAndGoals  updateData={updatePartialData} handleNextPage={nextFormPage}/>}
        </MyModal>
      </>
    );
}

import React from "react";
import saveOnboardingData from "./saveOnboardingData";

type FormSectionProps =  {
  updateData: (partialData: Partial<OnbaordingFormData>) => void,
  handleNextPage: () => void
}

// Profile Information Component
const ProfileInformation = ({updateData, handleNextPage}: FormSectionProps) => {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(e)
    updateData({
      full_name: e.target.full_name.value,
      username: e.target.username.value,
      instagram_url: e.target.instagram_url.value,
      location: e.target.location.value
   })
    handleNextPage()
  }

  return (
    <form className="dark:bg-gray-800 p-4 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Let's Get to Know You</h2>
      <p className="mb-4">
        We need some basic information to personalize your experience.
      </p>
      <label>
        <input
          className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
          type="text"
          placeholder="Full Name"
          name="full_name"
        />
      </label>
      <label >
        <input
          className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
          type="text"
          placeholder="Username"
          name="username"
        />
      </label>
      <label>
        <input
          className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
          type="text"
          placeholder="Instagram URL (optional)"
          name="instagram_url"
        />
      </label>
      <label >
        <input
          className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
          type="text"
          placeholder="Location"
          name="location"
        />
      </label>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        type="submit"> 
              Next
              </button>
    </form>
  );
};

// Bio Component
const Bio = ({updateData, handleNextPage}: FormSectionProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(e)
    updateData({
      age: e.target.age.value,
      height: e.target.height.value,
      weight: e.target.weight.value,
      sex: e.target.sex.value
   })
    handleNextPage()
  }

  return (
    <form className="dark:bg-gray-800 p-4 rounded-lg mt-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Your Physical Details</h2>
      <p className="mb-4">
        These details will help us tailor workouts to your body type and fitness
        level.
      </p>
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Age"
        name="age"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Height (in cm)"
        name="height"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Weight (in kg)"
        name="weight"
      />
      <select 
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        name="sex">
        <option>Male</option>
        <option>Female</option>
      </select>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"> 
              Next
              </button>
    </form>
  );
};

// Experience and Goals Component
const ExperienceAndGoals = ({updateData, handleNextPage}: FormSectionProps) => {

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(e)
    updateData({
      level: e.target.level.value,
      goal: e.target.goal.value,
      target_weight: e.target.target_weight.value
   })
    handleNextPage()
  }
  return (
    <form className="dark:bg-gray-800 p-4 rounded-lg mt-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Your Fitness Journey</h2>
      <p className="mb-4">
        Tell us about your fitness experience and goals. This will help us
        create the best workout plan for you.
      </p>
      <select className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
      name="level">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <select className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
      name="goal">
        <option value={1}>Lose Weight</option>
        <option value={2}>Build Muscle</option>
        <option value={3}>Improve Cardio</option>
      </select>
      <input name="target_weight"
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Target Weight (in kg)"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"> 
              Submit
              </button>
    </form>
  );
};

// // Main Form Component
// const MainForm = () => {
//   return (
//     <div className="dark:bg-gray-900 p-4">
//     </div>
//   );
// };

// export default MainForm;


export default OnboardingModal