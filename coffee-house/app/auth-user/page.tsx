'use client'


import RegistrationForm from "@/components/auth/RegistrationForm";
import SignInForm from "@/components/auth/SignInForm";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthRedirect } from "@/lib/hooks/useRedirectIfAuthenticated";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from 'framer-motion';

export default function Page() {
  const { showLoader } = useAuthRedirect();
  const [tab, setTab] = useState("SignIn");

   if (showLoader) {
     return <FullScreenLoader />;
   }
   
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Tabs value={tab} onValueChange={setTab} defaultValue="account">
        <TabsList className="block sm:hidden">
          <TabsTrigger value="SignIn">Sign In</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="SignIn">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: "backOut",
              delay: 0.2,
            }}
            className="m-0 mb-10 font-inter  hidden sm:block leading-[1.06] text-primary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center max-w-[800px]"
          >
            Sign In
          </motion.h2>
          <div className="my-8">
            <SignInForm />
          </div>

          <div className="flex gap-2 items-center justify-center">
            <p className="text-primary">Don’t have an account yet?</p>
            <button
              onClick={() => setTab("Register")}
              className="relative text-md font-semibold text-primary flex gap-0 items-center justify-center
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              Sign up <ChevronRight />
            </button>
          </div>
        </TabsContent>
        <TabsContent value="Register">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: "backOut",
              delay: 0.2,
            }}
            className="m-0 mb-10 font-inter  hidden sm:block leading-[1.06] text-primary xl:text-[60px] md:text-[55px] text-[40px] sm:text-[50px] font-semibold text-center max-w-[800px]"
          >
            Registration
          </motion.h2>
          <div className="my-8">
            <RegistrationForm />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-primary">Already have an account?</p>{" "}
            <button
              onClick={() => setTab("SignIn")}
              className="text-primary relative text-md font-semibold  flex gap-0 items-center justify-center
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              Log in <ChevronRight />
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
