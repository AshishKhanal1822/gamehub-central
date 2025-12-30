"use client";

import { useState } from "react";


import { useRouter, useSearchParams } from "next/navigation";


import { motion } from "framer-motion";

import { Gamepad2, Mail, Lock, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const searchParams = useSearchParams();

  const [isSignup, setIsSignup] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login, signup } = useApp();
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = isSignup ? await signup(email, password, username) : await login(email, password);
    if (success) {
      toast({ title: isSignup ? "Account created!" : "Welcome back!", description: "You are now signed in." });
      router.push("/");

    } else {
      toast({ title: "Error", description: "Please check your credentials.", variant: "destructive" });
    }
  };

  return (
    <>

      <Layout>

        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <Card variant="glass" className="p-8">
              <div className="text-center mb-8">
                <Gamepad2 className="w-12 h-12 mx-auto text-primary mb-4" />
                <h1 className="text-2xl font-gaming font-bold">{isSignup ? "Create Account" : "Welcome Back"}</h1>
                <p className="text-muted-foreground mt-2">{isSignup ? "Join GameHub today" : "Sign in to your account"}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10" required />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                </div>
                <Button variant="gaming" size="lg" className="w-full">{isSignup ? "Create Account" : "Sign In"}</Button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline text-sm">
                  {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default Auth;
