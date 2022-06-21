import React, { useState } from 'react'
import {useAuth} from '../../contexts'

import { supabase } from '../../../supabaseClient';

const Profile = () => {
    const {currentUser} = useAuth();

    const [inputState, setInputState] = useState(true);
    const profileInputToggle = ()=>{
       setInputState(!inputState);
    }
   
    const updateProfile = ()=>{
        
    }
  return (
      <>
    <section className="ui-card-default  flex flex-wrap profile gap  mt-3 py  shadow-md">
     
     <div className='flex flex-between'>
         <div>Update Profile</div>
         <div className="two">
         <button className="btn-primary btn btn-sm "
         onClick={profileInputToggle}
         >Enable Edit Profile</button>
         </div>
         <button onClick={updateProfile}>click</button>
     </div>

    <div className="qg-flex-1  pt-1 pb-1 flex flex-wrap flex-justify-center">
        <img className="user-update-profile" src="https://quizgrad.netlify.app/public/img/categories/user-profile.jpeg" alt="user-profile" />
    </div>


<form className="flex flex-column gap ui-card-default py-1">

    <div className="flex flex-column gap-1">
        <label htmlFor="editusername" className="label-text label-text-primary">Profile Name</label>
        <input type="email" className={` input ${(inputState)? 'input-disabled' : ''}  `}  placeholder="username" id="editusername"
            aria-describedby="editusername" readOnly={inputState}  />
    </div>
    <div className="flex flex-column gap-1">
        <label htmlFor="editProfilePicture" className="label-text label-text-primary">Upload Profile Picture</label>
        <input type="file"   placeholder="username" id="editProfilePicture"
            aria-describedby="editProfilePicture" disabled={inputState}  />
    </div>
    <div className="flex flex-column gap-1">
        <label htmlFor="editBio" className="label-text label-text-primary">Edit Bio</label>
        <textarea className={`input  py-1 input-textarea ${(inputState)? 'input-disabled':''}`} id="editBio" readOnly={inputState}></textarea>
    </div>

    <button type="submit"  className="btn-primary btn btn-py-1 flex flex-justify-center width-full ">
        <span className="font-size-sm"> Update Profile </span>
    </button>

</form>
    
     
 
 </section>
 </>

  )
}

export {Profile}