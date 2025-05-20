'use client';
import { LockIcon, MailIcon, X } from "lucide-react";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
// import { BlinkingGrid } from '@/components/ui/blinking-grid';
import { BlinkingGrid } from "../../components/ui/blinking-grid";

export const Connect_login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError('');
    }
  };

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    // Here you would typically handle authentication
    // For now, we'll just navigate to the downloading page
    router.push('/downloading');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-8">
      <BlinkingGrid />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#030f01]/80 to-[#030f01] z-0 opacity-50" />
      
      <div className="relative z-10 w-[480px] h-[276px] bg-[#030303]/90 p-[32px] rounded-[6px] text-left">
        <div className="w-full flex flex-col items-left gap-5">
          
          <div className="flex gap-4">
            <img
              className="h-6"
              alt="Logo"
              src="/espn.svg"
            />
            <h1 className="text-white text-[18px] text-left">
              Connecting ESPN
            </h1>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="h-[40px] w-[416px] relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="h-10 w-full pl-10 pr-3 rounded-[4px] bg-[#141414] text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF4D] placeholder:text-[#9D9D95] text-white"
                placeholder="Email address"
                required
                style={{ color: 'white' }}
              />
              {emailError && (
                <div className="text-[#ff4d4d] text-sm mt-1">
                  {emailError}
                </div>
              )}
              <MailIcon className="text-[#9D9D95] absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>

            <div className={`h-[40px] w-[416px] relative ${emailError ? 'mt-4' : ''}`}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full pl-10 pr-3 rounded-[4px] bg-[#141414] text-[16px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B5FF4D] placeholder:text-[#9D9D95] text-white"
                placeholder="Password"
                required
                style={{ color: 'white' }}
              />
              <LockIcon className="text-[#9D9D95] absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>
          </div>

          <Button
            className="h-[48px] w-[416px] bg-[#B5FF4D] rounded-[4px] text-[#030303] hover:bg-[#B5FF4D]/90 transition-colors text-[16px]"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#ccccc9] hover:text-white hover:bg-transparent absolute top-[25px] right-[25px] rounded-full p-2"
          onClick={handleCancel}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
