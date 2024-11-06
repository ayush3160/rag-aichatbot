"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";

interface SocialAuthButtonsProps {
  isLoading: boolean;
}

export function SocialAuthButtons({ isLoading }: SocialAuthButtonsProps) {
  const handleGoogleLogin = async () => {
    // Implement Google login
    console.log("Google login");
  };

  const handleGithubLogin = async () => {
    // Implement Github login
    console.log("Github login");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="w-full"
      >
        <Image
          src="https://www.google.com/favicon.ico"
          alt="Google"
          width={16}
          height={16}
          className="mr-2"
        />
        Google
      </Button>
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={handleGithubLogin}
        className="w-full"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}