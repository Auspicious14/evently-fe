"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithTwitter, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, pass: password });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/signup">Signup</Link>
          <Button
            disabled={loading}
            onClick={loginWithTwitter}
            variant="outline"
          >
            {loading ? "Loading..." : "Login with X"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
