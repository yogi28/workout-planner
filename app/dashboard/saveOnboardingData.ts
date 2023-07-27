import { OnbaordingFormData } from "./OnboardingModal";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs"; 
import { Database } from "@/types/supabase";


export default async function saveOnboardingData(onboardingData:OnbaordingFormData) {
    const supabase = createClientComponentClient<Database>()
    const {
        data: { user },
      } = await supabase.auth.getUser()
      
    //   const insertUserPrefs = async () => {
        const dataJson = {
          "height": onboardingData.height,
          "weight": onboardingData.weight,
          "target_weight": onboardingData.target_weight,
          "sex": onboardingData.sex,
          "goal": onboardingData.goal,
          "level": onboardingData.level
        }
        const user_pref_response = await supabase
        .from('user_preferences')
        .update(
          { 'age': onboardingData.age, 
            'location': onboardingData.location,
            'data': dataJson
           },)
        .eq('id', user?.id)
        .select()
        console.log(user_pref_response.error);

        if(!user_pref_response.error){
  
          const { data, error } = await supabase
          .from('user_preferences')
          .update({ 'onboarded': true })
          .eq('id', user?.id)
          .select()
          console.log(error)
        }
    //   }
  
    //   const insertProfiles = async () => {
        const profile_response = await supabase
        .from('profiles')
        .update({ 
          full_name: onboardingData.full_name,
          id: user?.id,
          instagram_url: onboardingData.instagram_url,
          username: onboardingData.username
        },)
        .eq('id', user?.id)
        .select()
        console.log(profile_response.error);
    //   }

    //   insertUserPrefs()
}