import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BackButton from './ui/Backbutton';

function Allusers() {
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);

  useEffect(function () {
    async function getusers() {
      const res = await axios.get("http://localhost:3000/api/seeusers", {
        withCredentials: true
      })
      let users = res.data.ans
      console.log(users)
      setusers(users)
      setloading(false)
    }
    getusers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 to-rose-100 flex flex-col items-center py-8">
        <BackButton className='fixed r-'></BackButton>
      <div className="mb-8 px-6 py-3 rounded-lg shadow-xl bg-amber-400/80 text-white text-4xl font-black tracking-wider border-amber-500 border-2 shadow-amber-200">
        All Active Users on <span className="text-fuchsia-600 drop-shadow">Todoflex</span>
      </div>
      <div className="w-full max-w-4xl">
        {loading === false ? (
          users.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {users.map(function (e) {
                return (
                  <div
                    key={e._id}
                    className="flex flex-col items-center justify-center bg-white shadow-2xl hover:shadow-fuchsia-200 transition duration-300 cursor-pointer rounded-2xl border-b-4 border-amber-300 py-8 px-6 group"
                  >
                    <div className="rounded-full bg-amber-100 p-2 shadow-lg mb-4">
                      {/* Avatar Icon */}
                      <svg className="w-12 h-12 text-amber-500 group-hover:text-fuchsia-500 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.008 9.008 0 0012 21c2.065 0 3.969-.632 5.483-1.696m-4.568-13.65A4.001 4.001 0 118.88 8.35m6.24 0A4 4 0 0116.001 7m.531 6.097A4.992 4.992 0 0112 17a4.992 4.992 0 01-4.531-3.903" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-800 group-hover:text-fuchsia-800 transition-all tracking-wide mb-1">
                      {e.username}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-amber-400 tracking-wide">
                      {e.id}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-xl font-semibold py-16">
              No current users
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="animate-spin h-12 w-12 text-amber-400 mb-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span className="text-amber-500 text-2xl font-semibold">Loading please wait ...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Allusers
