import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from './ui/button';
import BackButton from './ui/Backbutton';

function EditProfile() {
    let [profile , setProfile]= useState({})
    useEffect( function(){
        async function profile(){
            const res= await axios.get("http://localhost:3000/api/profile",{
                withCredentials: true 
            })
        const profileData= res.data
       console.log(res?.data.ans)
        setProfile(res?.data.ans)
       
   

        }profile()
    } , [])
 return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-fuchsia-50 to-sky-100 flex flex-col items-center justify-center py-8 px-2">
    <BackButton></BackButton>
    <div className="text-4xl font-extrabold text-fuchsia-700 mb-6 tracking-tight drop-shadow-lg">
      My Profile
    </div>
    <div className="w-full max-w-md bg-white/80 rounded-3xl shadow-2xl border-2 border-amber-200 px-8 py-10 flex flex-col items-center gap-8 backdrop-blur-lg animate-fade-in">
    
      <div className="relative w-32 h-32 mb-3">
        <div className="w-full h-full rounded-full border-4 border-amber-200 shadow-lg flex items-center justify-center bg-gradient-to-br from-amber-100 to-pink-100 overflow-hidden">
          <MdOutlineAddPhotoAlternate className="text-amber-400 w-20 h-20" />
        </div>

      </div>
      
      <form
        className="flex flex-col gap-6 w-full justify-center items-center"
        action=""
        method="post"
        encType="multipart/form-data"
      >
        <label
          htmlFor="profileImgInput"
          className="w-full flex flex-col items-center justify-center bg-amber-100 rounded-xl py-3 px-4 cursor-pointer border-2 border-dashed border-fuchsia-200 shadow hover:bg-amber-200 transition"
        >
          <span className="text-amber-600 font-medium text-base mb-1 flex items-center gap-1">
            <MdOutlineAddPhotoAlternate className="inline-block" /> Upload Profile Photo
          </span>
          <input
            type="file"
            id="profileImgInput"
            name="profileImage"
            accept="image/*"
            className="hidden"
          />
        </label>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-white rounded-lg px-4 py-2 text-lg text-fuchsia-700 font-bold border border-fuchsia-200 shadow-sm">
            Name: <span className="text-slate-800 font-semibold">{profile.username}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 text-lg text-amber-700 font-bold border border-amber-200 shadow-sm">
            Email: <span className="text-slate-800 font-semibold">{profile.email}</span>
          </div>
        </div>
       
      </form>
    </div>
  </div>
);
}

export default EditProfile