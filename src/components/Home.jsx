import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BackButton from "./ui/Backbutton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
function Home() {
  const navigate = useNavigate()
  let [donetodo, setdonetodo] = useState(0);
  const [title, settitle] = useState("");
  const [todo, setTodo] = useState([]);
  async function sendTodo() {
    const ans = await axios.post(
      "https://todobackend-73u6.onrender.com/api/create",
      {
        title: title,
      },
      {
        withCredentials: true, 
         headers: {
    "Content-Type": "application/json"
  }
      },
    );
    const newtodo = ans.data.todo;
    const addtodo = {
      id: newtodo.id,
      title: newtodo.title,
      done: newtodo.done,
    };
    setTodo(function (prev) {
      return [...prev, addtodo];
    });
    console.log(ans.data);
    settitle("");
  }

  useEffect(function gettodo() {
    async function fetch() {
      const h = await axios.get("https://todobackend-73u6.onrender.com/api", {
        withCredentials: true, 
           headers: {
    "Content-Type": "application/json"
  }});
      const final = h.data.ans;
      const inputtodo = final.map(function (e) {
        return {
          id: e.id,
          title: e.title,
        };
      });
      console.log(final);
      setTodo(inputtodo);
    }
    fetch();
  }, []);
  useEffect(
    function () {
      let ans = todo.filter(function (e) {
        return e.done == true;
      });
      setdonetodo(ans.length);
    },
    [todo]
  );
  async function deleteAll() {
    const ans = await axios.delete("https://todobackend-73u6.onrender.com/api/delete",{
          headers: {
    "Content-Type": "application/json"
  }
        });
    setTodo([]);
  }
  const [today, setoday] = useState(new Date());
  async function logout(){
    const ans= await axios.get("https://todobackend-73u6.onrender.com/api/logout",{
        withCredentials: true ,
         headers: {
    "Content-Type": "application/json"
  }
    } )
    navigate('/')
  }

  useEffect(function () {
    setInterval(() => {
      setoday(new Date());
    }, 1000);
  }, []);

  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

   return (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-gray-50 p-2 sm:p-6 md:p-8">
    <div className="flex justify-center items-center bg-pink-100 p-4 sm:p-6 rounded-2xl shadow-lg mb-6 sm:mb-8">
      <img
        src="https://vigyanyoga.com/wp-content/uploads/2023/03/22628577_6672181.jpg"
        className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-50 hover:scale-105 transition-transform duration-300"
        alt=""
      />
    </div>

    <div className="text-2xl sm:text-4xl font-extrabold text-gray-800">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <span>
          Todo List of the Date {`${date}-${month}-${year}`}
        </span>
        <Button
          onClick={deleteAll}
          className="my-2 sm:my-0 sm:ml-6 border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300"
          variant="destructive"
        >
          YES! I COMPLETED EVERYTHING
        </Button>
        <Link to="/profile">
          <Button className="mt-2 sm:mt-0 sm:ml-2 bg-amber-300 hover:bg-green-500 font-semibold text-black">
            Edit Profile
          </Button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-2 text-base sm:text-xl text-gray-600 font-semibold">
        {hours}:{minutes}:{seconds}
      </div>
    </div>

    {/* TODOS SECTION */}
    <div className="my-8 sm:my-10 bg-white rounded-2xl p-4 sm:p-6 shadow-lg w-full max-w-lg sm:max-w-3xl mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-start lg:gap-6">
      <div className="w-full lg:w-2/3">
        {todo.map(function (e) {
          return (
            <div
              key={e.id}
              className="text-base sm:text-xl flex flex-col sm:flex-row items-start sm:items-center p-2 sm:p-4 m-2 bg-gray-50 rounded-lg hover:shadow-md hover:translate-x-1 transition-all duration-200 w-full"
            >
              <span>
                {e.id}. {e.title}
              </span>
              <div className="flex items-center mt-2 sm:mt-0 sm:ml-4">
                <Checkbox
                  className="w-5 h-5 border-2 border-gray-300 rounded checked:bg-emerald-500 checked:border-emerald-500 transition-all duration-200"
                  onClick={async function () {
                    const result = await axios.put(
                      `https://todobackend-73u6.onrender.com/api/update/${e.id}`,
                      { done: !e.done }
                    );
                    setTodo(function (prev) {
                      return prev.map(function (tod) {
                        return tod.id === e.id ? { ...tod, done: !tod.done } : tod;
                      });
                    });
                  }}
                ></Checkbox>
                {e.done ? (
                  <div className="ml-4 text-emerald-600 font-bold px-2 py-1 rounded bg-emerald-100">
                    COMPLETED
                  </div>
                ) : (
                  <div className="ml-4 text-red-600 font-bold px-2 py-1 rounded bg-red-100">
                    PENDING
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* TASK COUNTER */}
    <div className="font-extrabold text-2xl sm:text-3xl text-gray-800 flex justify-center items-center fixed left-1/2 bottom-32 -translate-x-1/2 bg-amber-100 p-2 sm:p-4 rounded-xl shadow-lg w-11/12 sm:max-w-md">
      TOTAL TASKS COMPLETED {donetodo} / {todo.length}
    </div>

    {/* INPUT + BUTTONS */}
    <div className="fixed left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center justify-center w-full sm:w-11/12 sm:max-w-md px-2">
      <Textarea
        placeholder="Enter your task"
        className="w-full bg-pink-100 border-2 border-pink-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all duration-200"
        value={title}
        onChange={(e) => settitle(e.target.value)}
      ></Textarea>
      <Button
        onClick={sendTodo}
        className="mt-4 w-full bg-amber-300 text-gray-800 font-semibold border-2 border-amber-400 rounded-lg px-6 py-2 hover:bg-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        Submit Todo
      </Button>

      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-4">
        <Link to="/allusers" className="w-full sm:w-auto">
          <Button
            className="w-full border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300"
            variant="destructive"
          >
            See your COMPETITORS!
          </Button>
        </Link>
        <Link to="/Login" className="w-full sm:w-auto">
          <Button
            onClick={logout}
            className="w-full border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300"
            variant="destructive"
          >
            Logout
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

 
}

export default Home;
