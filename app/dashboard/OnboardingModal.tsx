import MyModal from "@/components/Modal"
import { JSX, ReactNode, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; 
import { Database } from "@/types/supabase";

type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"]
type UserProfile = Database["public"]["Tables"]["profiles"]["Row"]

const OnboardingModal = (modalProps: JSX.IntrinsicAttributes & { closeModal: () => void; isOpen: boolean; }) => {
    const [page, setPage] = useState(0)

    const handleClick = () => {
        if (page < 2) {
            setPage(page + 1)
        } else {
            alert("Submitting...")
            // save to db

            // close modal
            modalProps.closeModal()
        }
    }
    return (
      <>
        <MyModal title="Your fitness goals" {...modalProps}
          action={
            <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleClick}
            >
              {page === 2 ? "Submit" : "Next"}
            </button>
            </div>
          }
        >
          {page === 0 && <ProfileInformation />}
          {page === 1 && <Bio />}
          {page === 2 && <ExperienceAndGoals />}
        </MyModal>
      </>
    );
}

import React from "react";

// Profile Information Component
const ProfileInformation = () => {
  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Let's Get to Know You</h2>
      <p className="mb-4">
        We need some basic information to personalize your experience.
      </p>
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="text"
        placeholder="Full Name"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="text"
        placeholder="Username"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="text"
        placeholder="Instagram URL (optional)"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="text"
        placeholder="Location"
      />
    </div>
  );
};

// Bio Component
const Bio = () => {
  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Your Physical Details</h2>
      <p className="mb-4">
        These details will help us tailor workouts to your body type and fitness
        level.
      </p>
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Height (in cm)"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Weight (in kg)"
      />
      <select className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full">
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  );
};

// Experience and Goals Component
const ExperienceAndGoals = () => {
  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Your Fitness Journey</h2>
      <p className="mb-4">
        Tell us about your fitness experience and goals. This will help us
        create the best workout plan for you.
      </p>
      <select className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full">
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Goal (1 - Lose Weight, 2 - Build Muscle, 3 - Improve Cardio)"
      />
      <input
        className="dark:bg-gray-700 rounded-lg mb-2 p-2 w-full"
        type="number"
        placeholder="Target Weight (in kg)"
      />
    </div>
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