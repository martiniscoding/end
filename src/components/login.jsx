import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import axios from "axios"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigate= useNavigate()
    let [signup , setsignup] = useState({
        email: "",
        username:"",
        password:""
    })
    function handleSignup(e){
        setsignup({
            ...signup,
            [e.target.name] : e.target.value
        })
        console.log(signup)
        
    }
    let [login , setlogin] = useState({
        username:"",
        password:""
    })
    function handlelogin(e){
        setlogin({
            ...login,
            [e.target.name] : e.target.value
        })
        console.log(login)
        
        
    }
    async function createAccount(){
        const result = await axios.post("https://todobackend-73u6.onrender.com/api/signup" , {
            email: signup.email,
            username : signup.username,
            password: signup.password
        },{
          headers: {
    "Content-Type": "application/json"
  }
        })
        const ans= result.data.msg
        console.log(ans)
        toast(`${ans}`)
      
    }
    async function loginNow(){
      console.log(login)
      
      
        const result = await axios.post ("https://todobackend-73u6.onrender.com/api/login", {
            username: login.username,
            password: login.password
        },  {
          withCredentials:true  // Yeh line bilkul zaruri hai
         })
        
       
        
        const ans = result.data
        console.log(ans )

        ans.success==true ? navigate("/home") : toast(`invalid credentials `)
        
      
    }

 
    return (
  <div className="flex flex-col gap-6 bg-gradient-to-bl from-yellow-100 via-rose-50 to-fuchsia-100 items-center justify-center w-screen h-screen">
    <Toaster />
    <Tabs defaultValue="account" className="rounded-2xl bg-white bg-opacity-60 backdrop-blur-2xl shadow-2xl py-8 px-8 min-w-[340px] md:min-w-[430px] border-2 border-amber-200">
      <TabsList className="flex w-full justify-center bg-amber-50/60 rounded-2xl shadow mb-7 border border-amber-200">
        <TabsTrigger value="account" className="w-1/2 px-6 py-2 font-bold text-lg rounded-xl transition-all data-[state=active]:bg-fuchsia-200/80 data-[state=active]:text-fuchsia-800 data-[state=inactive]:text-amber-600 hover:scale-105">
          Create Account
        </TabsTrigger>
        <TabsTrigger value="password" className="w-1/2 px-6 py-2 font-bold text-lg rounded-xl transition-all data-[state=active]:bg-amber-300/80 data-[state=active]:text-amber-900 data-[state=inactive]:text-fuchsia-500 hover:scale-105">
          Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="shadow-xl border-0 bg-white bg-opacity-[85%] backdrop-blur rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl text-fuchsia-600 font-extrabold">
              <AppWindowIcon className="h-8 w-8 text-amber-400" />
              Welcome
            </CardTitle>
            <CardDescription className="text-base text-amber-600 mt-2 leading-relaxed">
              The <span className="font-bold text-fuchsia-500">best Todo app</span>.  
              <span className="inline bg-gradient-to-r from-amber-400 via-red-300 to-fuchsia-400 bg-clip-text text-transparent font-bold"> Create your free account now!</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="signup-email" className="font-medium text-amber-700">Email</Label>
              <Input
                id="signup-email"
                className="rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-fuchsia-300 focus:outline-none transition"
                placeholder="eg. martin@gmail.com"
                name="email"
                value={signup.email}
                onChange={handleSignup}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="signup-username" className="font-medium text-amber-700">Username</Label>
              <Input
                id="signup-username"
                className="rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-fuchsia-300 focus:outline-none transition"
                placeholder="eg. martin_codes"
                name="username"
                value={signup.username}
                onChange={handleSignup}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="signup-password" className="font-medium text-amber-700">Password</Label>
              <Input
                id="signup-password"
                type="password"
                className="rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-fuchsia-300 focus:outline-none transition"
                name="password"
                value={signup.password}
                onChange={handleSignup}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-fuchsia-400 to-amber-300 shadow-lg hover:from-amber-400 hover:to-fuchsia-300 font-bold text-lg py-3 rounded-xl hover:scale-105 transition lg:tracking-wide"
              onClick={createAccount}
            >
              Create Account
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="shadow-xl border-0 bg-white bg-opacity-[85%] backdrop-blur rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl text-amber-500 font-extrabold">
              <CodeIcon className="h-8 w-8 text-fuchsia-400" />
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-base text-fuchsia-500 mt-2 leading-relaxed">
              Get back to <span className="font-bold text-amber-500">productivity</span>!  
              <span className="inline bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300 bg-clip-text text-transparent font-bold"> Let's work ...</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="login-username" className="font-medium text-fuchsia-700">Username</Label>
              <Input
                id="login-username"
                type="text"
                className="rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-amber-400 focus:outline-none transition"
                onChange={handlelogin}
                name="username"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="login-password" className="font-medium text-fuchsia-700">Password</Label>
              <Input
                id="login-password"
                type="password"
                className="rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-amber-400 focus:outline-none transition"
                onChange={handlelogin}
                name="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-amber-400 to-fuchsia-400 shadow-lg hover:from-fuchsia-400 hover:to-amber-300 font-bold text-lg py-3 rounded-xl hover:scale-105 transition lg:tracking-wide"
              onClick={loginNow}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
)

    
  
}

export default Login