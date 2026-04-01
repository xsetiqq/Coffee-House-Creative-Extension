"use client";
import ModalDialog from "@/components/ui/ModalDialog";
import { useUser } from "@/lib/hooks/useGetUserFromLS";
import { formatDate, formatPaymentMethod } from "@/lib/utils";
import { User, MapPin, CreditCard, Calendar, LogOut } from "lucide-react";
import Link from "next/link";
import  { useState } from "react";
import { motion } from 'framer-motion';
import { toast } from "sonner";


export default function UserMenu() {
  const {
    user,
    username,
    isLoading,
    logout,
    userAddress,
    userPaymentMethod,
    userCreatedAt,
  } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="relative text-md font-semibold text-primary flex gap-2 items-center justify-center">
        <User className="w-8 h-8" />
        <div className="text-sm">
          <p className="font-normal">Welcome</p>
          <p className="font-bold">Sign in / Register</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth-user"
        className="relative text-md font-semibold text-primary flex gap-2 items-center justify-center
                   after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                   after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
      >
        <User className="w-8 h-8" />
        <div className="text-sm">
          <p className="font-normal">Welcome</p>
          <p className="font-bold">Sign in / Register</p>
        </div>
      </Link>
    );
  }




  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative text-md font-semibold text-primary flex gap-2 items-center justify-center
                   after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                   after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
      >
        <User className="w-8 h-8" />
        <div className="text-sm text-left">
          <p className="font-normal">Welcome,</p>
          <p className="font-bold">{username}!</p>
        </div>
      </button>
      <ModalDialog
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        className="sm:max-w-2xl dark:bg-background text-primary border border-ring"
      >
        <motion.div
          className="w-full max-w-[680px] mx-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <h3 className="text-lg font-semibold leading-tight">
                {username}
              </h3>
            </div>
          </div>

          <motion.div
            className="bg-foreground rounded-2xl p-5 shadow-sm border border-muted/20"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-background rounded-lg flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Username</p>
                    <p className="font-medium">{username}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      ID: {user?.id}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsModalOpen(false);
                    }}
                    whileHover={{ translateY: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
                  >
                    <LogOut className="w-6 h-6 text-white" />
                    <span className="text-sm font-medium text-white">
                      Log out
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => toast.warning("Feature coming soon :)")}
                    whileHover={{ translateY: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 border border-input hover:shadow-sm transition"
                  >
                    <User className="w-6 h-6 text-white" />
                    <span className="text-sm font-medium text-white">
                      Add account
                    </span>
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">{userAddress ?? "Not set"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-background">
                  <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="text-sm">
                      {userPaymentMethod
                        ? formatPaymentMethod(userPaymentMethod)
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-background ">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Member since
                    </p>
                    <p className="text-sm">
                      {userCreatedAt ? formatDate(userCreatedAt) : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-muted/40 text-center">
              <p className="text-sm text-secondary">
                If you need help, please contact our support team.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </ModalDialog>
    </>
  );
}
