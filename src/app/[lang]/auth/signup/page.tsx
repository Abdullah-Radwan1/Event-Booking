"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, User, CheckCircle, UserPlus } from "lucide-react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../../../../css/bounce.css";
import { getSession, signIn } from "next-auth/react";
import { Role } from "../../../../../prisma/src/generated/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const { lang } = useParams();
  const ar = lang === "ar";

  const t = {
    title: ar ? "إنشاء حساب " : "Sign Up ",
    heading: ar ? "أنشئ حسابك" : "Create your account",
    subheading: ar
      ? "انضم إلى مجتمعنا واكتشف فعاليات رائعة"
      : "Join our community and discover amazing events",
    passwordMismatch: ar
      ? "كلمتا المرور غير متطابقتين"
      : "Passwords do not match",
    signUpFailed: ar
      ? "فشل في إنشاء الحساب. حاول مرة أخرى."
      : "Failed to create account. Please try again.",
    creatingAccount: ar ? "جاري إنشاء الحساب..." : "Creating account...",
    signUpButton: ar ? "إنشاء حساب" : "Sign up",
    alreadyAccount: ar ? "هل لديك حساب؟" : "Already have an account?",
    signIn: ar ? "تسجيل الدخول" : "Sign in",
    orSignUpWith: ar ? "أو التسجيل عبر" : "Or sign up with",
    githubComing: ar ? "قريبًا" : "coming soon",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<Role>("USER");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        name,
        email,
        password,
        redirect: false,
        role,
        isSignUp: "true",
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      toast.success(
        ar ? "تم إنشاء الحساب بنجاح" : "Account created successfully"
      );

      // Wait until session is fully available
      let attempts = 0;
      const maxAttempts = 10;
      let session = null;

      while (attempts < maxAttempts) {
        session = await getSession();
        if (session?.user) break;
        await new Promise((r) => setTimeout(r, 200));
        attempts++;
      }

      if (!session?.user) {
        setError(t.signUpFailed);
        return;
      }

      // Redirect to home page
      router.push(ar ? "/ar" : "/");
    } catch (err) {
      console.error(err);
      setError(t.signUpFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.subheading} />
      </Head>

      <div className="flex animate-slideLeft justify-center p-4">
        <div className="w-full max-w-md rounded-lg shadow-sm p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{t.heading}</h2>
            <p className="text-sm text-gray-400 mt-1">{t.subheading}</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name, Email, Role, Password, Confirm Password fields */}
            {/* ... same as your current code ... */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
