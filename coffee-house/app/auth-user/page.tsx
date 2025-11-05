'use client'


import SignInForm from "@/components/auth/SignInForm";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthRedirect } from "@/lib/hooks/useRedirectIfAuthenticated";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { showLoader } = useAuthRedirect();
  const [tab, setTab] = useState("SignIn");

   if (showLoader) {
     return <FullScreenLoader />;
   }
   
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Tabs value={tab} onValueChange={setTab} defaultValue="account">
        <TabsList>
          <TabsTrigger value="SignIn">Sign In</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="SignIn">
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
          <div className="flex gap-2 items-center">
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
