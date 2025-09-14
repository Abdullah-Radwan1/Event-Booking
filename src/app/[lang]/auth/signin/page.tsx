"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../../../../css/bounce.css";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ar = useParams().lang === "ar";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      // ✅ full redirect so middleware runs immediately
      window.location.href = ar ? "/ar" : "/";
    } catch (err) {
      console.error(err);
      setError(
        ar ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{ar ? "تسجيل الدخول" : "Sign In"}</title>
        <meta
          name="description"
          content={ar ? "سجّل الدخول إلى حسابك" : "Sign in to your account"}
        />
      </Head>

      <div
        className={`flex items-center justify-center px-4 py-12 animate-slideLeft ${
          ar ? "direction-rtl text-right" : ""
        }`}
        dir={ar ? "rtl" : "ltr"}
      >
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              {ar ? "مرحبًا بعودتك" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {ar
                ? "سجّل الدخول إلى حسابك للمتابعة"
                : "Sign in to your account to continue"}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/15 border-l-4 border-destructive p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    ar ? "right-0 pr-3" : "left-0 pl-3"
                  } flex items-center pointer-events-none`}
                >
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={ar ? "pr-10 text-right" : "pl-10"}
                  placeholder={
                    ar ? "مثال: abdullah@gmail.com" : "ex: abdullah@gmail.com"
                  }
                />
              </div>

              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    ar ? "right-0 pr-3" : "left-0 pl-3"
                  } flex items-center pointer-events-none`}
                >
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={ar ? "pr-10 text-right" : "pl-10"}
                  placeholder={ar ? "كلمة المرور" : "Password"}
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <LogIn className={`h-5 w-5 ${ar ? "ml-2" : "mr-2"}`} />
              {loading
                ? ar
                  ? "جارٍ تسجيل الدخول..."
                  : "Signing in..."
                : ar
                ? "تسجيل الدخول"
                : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {ar ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
            <Link
              href={ar ? "/ar/auth/signup" : "/auth/signup"}
              className="font-medium text-red-600 hover:underline"
            >
              {ar ? "إنشاء حساب" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
