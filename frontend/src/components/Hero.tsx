"use client";

import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Hero() {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get started with our platform by signing in or creating an account.
        </p>
        <SignedOut>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignInButton>
              <button className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="border-2 hover:cursor-pointer border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
