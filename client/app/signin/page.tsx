'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-hot-toast';

const SignInPage = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const loginUser = async (e: FormEvent) => {

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
      } else {
        setError(""); 
        toast.success(result.message);
        localStorage.setItem("token", result.token);
        router.push("/");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError("Failed to login user: " + error.message);
      }
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={loginUser} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</Label>
            <Input onChange={e => setEmail(e.target.value)} value={email} type="email" className="w-full px-4 py-2 border rounded" placeholder="Enter email" name="email" id="email" />
          </div>
          <div>
            <Label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</Label>
            <Input onChange={e => setPassword(e.target.value)} value={password} type="password" className="w-full px-4 py-2 border rounded" placeholder="Enter password" name="password" id="password" />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" className="w-full py-2 mt-2 bg-gray-900 text-white rounded hover:bg-black">
            Submit
          </Button>
          <div className="flex items-center gap-1">
            <p >Create an account ? </p>
           <Button variant={"link"} className="p-0">
           <Link href={"/signup"} className="block text-center text-blue-600">
              Sign up
            </Link>
           </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
