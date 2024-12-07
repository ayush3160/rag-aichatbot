"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart2, Loader2 } from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { AuthSeparator } from "@/components/auth/auth-separator";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/authApi";
import { setItemToLocalStorage } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    const response = await loginUser(data);

    if("error" in response) {
      setIsLoading(false);
    }else {
      setItemToLocalStorage("token", response.token);
      setIsLoading(false);
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span>Conversify.Ai</span>
          </Link>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        <SocialAuthButtons isLoading={isLoading} />
        
        <AuthSeparator />

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}