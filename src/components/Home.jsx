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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-gray-50 p-8">
      <div className="flex justify-center items-center bg-pink-100 p-6 rounded-2xl shadow-lg mb-8">
        <img
          src="https://vigyanyoga.com/wp-content/uploads/2023/03/22628577_6672181.jpg"
          className="w-32 h-32 rounded-full object-cover border-4 border-amber-50 hover:scale-105 transition-transform duration-300"
          alt=""
        />
         
      </div>
     
      
      <div className="text-4xl font-extrabold text-gray-800">
        <div className="flex justify-center items-center">
          Todo List of the Date {`${date}-${month}-${year}`}
          <Button
            onClick={deleteAll}
            className=" fixed right-60 border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300"
            variant="destructive"
          >
            {" "}
            YES ! I COMPLETED EVERYTHING
          </Button>
          <br />
          <Link to='/profile'>
          <Button className='fixed right-20 top-20 bg-amber-300 hover:bg-green-500  font-semibold text-black'>Edit Profile</Button>
          
          </Link>
          
        </div>
        <div className="flex justify-center items-center mt-2 text-xl text-gray-600 font-semibold">
          {hours}:{minutes}:{seconds}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-10 bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl">
        {todo.map(function (e) {
          return (
            <div className="text-xl flex items-center p-4 m-2 bg-gray-50 rounded-lg hover:shadow-md hover:translate-x-1 transition-all duration-200">
              {e.id}. {e.title}
              <Checkbox
                className="ml-4 w-5 h-5 border-2 border-gray-300 rounded checked:bg-emerald-500 checked:border-emerald-500 transition-all duration-200"
                onClick={async function () {
                  const result = await axios.put(
                    `https://todobackend-73u6.onrender.com/api/update/${e.id}`,
                    {
                      done: !e.done,
                    }
                  );
                  setTodo(function (prev) {
                    return prev.map(function (tod) {
                      return tod.id == e.id ? { ...tod, done: !tod.done } : tod;
                    });
                  });
                }}
              ></Checkbox>
              {e.done ? (
                <div className="ml-6 text-emerald-600 font-bold px-2 py-1 rounded bg-emerald-100">
                  COMPLETED
                </div>
              ) : (
                <div className="ml-6 text-red-600 font-bold px-2 py-1 rounded bg-red-100">
                  PENDING
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="font-extrabold text-3xl text-gray-800 flex justify-center items-center fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-amber-100 p-4 rounded-xl shadow-lg w-11/12 max-w-md">
        TOTAL TASKS COMPLETED {donetodo} /{todo.length}
      </div>
      <div className="fixed left-1/2 bottom-4 transform -translate-x-1/2 flex flex-col items-center justify-center w-11/12 max-w-md">
        <Textarea
          placeholder="Enter your task"
          className="bg-pink-100 border-2 border-pink-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:pink-sky-500 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
          value={title}
          onChange={function (e) {
            settitle(e.target.value);
          }}
        ></Textarea>
        <Button
          onClick={sendTodo}
          className="mt-4 bg-amber-300 text-gray-800 font-semibold border-2 border-amber-400 rounded-lg px-6 py-2 hover:bg-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Submit Todo
        </Button>
        
        <Link to='/allusers'>
        <Button 
            
            className=" fixed bottom-3 left-200 border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 "
            variant="destructive"
          >
            {" "}
            See your COMPETITORS !
          </Button>
        
        </Link>
        <Link to='/Login'>
        <Button onClick={logout}
            
            className=" fixed bottom-3 left-250 border-2 border-black hover:bg-green-600 hover:-translate-y-1 transition-all duration-300 "
            variant="destructive"
          >
            {" "}
            Logout
          </Button>
        
        </Link>
      </div>
    </div>
  );
}

export default Home;
