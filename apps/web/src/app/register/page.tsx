"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart2, Loader2 } from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { AuthSeparator } from "@/components/auth/auth-separator";
import { registerUser } from "@/api/authApi";
import { setItemToLocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      organisationName: formData.get("organisation-name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    const response = await registerUser(data);
    
    if("error" in response) {
      console.log(response.error);
      setIsLoading(false);
    }else{
      setItemToLocalStorage("token", response.token);
      setIsLoading(false);
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span>Conversify.Ai</span>
          </Link>
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-muted-foreground">Enter your details to get started</p>
        </div>

        <SocialAuthButtons isLoading={isLoading} />
        
        <AuthSeparator />

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Organisation's Name</Label>
            <Input id="organisation-name" name="organisation-name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}