"use client";
import { useUser } from "@/lib/hooks/useGetUserFromLS";
import { formatDate, formatPaymentMethod } from "@/lib/utils";
import { User, MapPin, CreditCard, Calendar, LogOut } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";


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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background text-foreground p-6 rounded-2xl shadow-xl w-[350px]">
            <h2 className="text-lg font-semibold mb-4 text-center">
              User Profile
            </h2>

            {/* Основная информация */}
            <div className="mb-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-lg">{username}</p>
                  <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                </div>
              </div>
            </div>

            {/* Детальная информация */}
            <div className="space-y-3 mb-6">
              {userAddress && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{userAddress}</span>
                </div>
              )}

              {userPaymentMethod && (
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>Payment: {formatPaymentMethod(userPaymentMethod)}</span>
                </div>
              )}

              {userCreatedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since: {formatDate(userCreatedAt)}</span>
                </div>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="space-y-2">
              <button
                className="w-full py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition flex items-center justify-center gap-2"
                onClick={() => {
                  logout();
                  setIsModalOpen(false);
                }}
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 border border-input rounded-md hover:bg-muted transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
