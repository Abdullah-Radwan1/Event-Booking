"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, User, CheckCircle, UserPlus } from "lucide-react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../../../../css/bounce.css";
import { signIn } from "next-auth/react";
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
import { setCookie } from "cookies-next";

const SignUp = () => {
  const { lang } = useParams();
  const ar = lang === "ar";

  const t = {
    title: ar ? "إنشاء حساب " : "Sign Up ",
    heading: ar ? "أنشئ حسابك" : "Create your account",
    subheading: ar
      ? "انضم إلى مجتمعنا واكتشف فعاليات رائعة"
      : "Join our community and discover amazing events",
    nameLabel: ar ? "الاسم الكامل" : "Full Name",
    emailLabel: ar ? "البريد الإلكتروني" : "Email",
    roleLabel: ar ? "الدور" : "Role",
    passwordLabel: ar ? "كلمة المرور" : "Password",
    confirmPasswordLabel: ar ? "تأكيد كلمة المرور" : "Confirm Password",
    tosText: ar ? "أوافق على" : "I agree to the",
    tosLink: ar ? "شروط الخدمة" : "Terms of Service",
    privacyLink: ar ? "سياسة الخصوصية" : "Privacy Policy",
    signUpButton: ar ? "إنشاء حساب" : "Sign up",
    creatingAccount: ar ? "جاري إنشاء الحساب..." : "Creating account...",
    alreadyAccount: ar ? "هل لديك حساب؟" : "Already have an account?",
    signIn: ar ? "تسجيل الدخول" : "Sign in",
    orSignUpWith: ar ? "أو التسجيل عبر" : "Or sign up with",
    githubComing: ar ? "قريبًا" : "coming soon",
    roleUser: ar ? "مستخدم" : "User",
    roleAdmin: ar ? "مشرف" : "Admin",
    passwordMismatch: ar
      ? "كلمتا المرور غير متطابقتين"
      : "Passwords do not match",
    signUpFailed: ar
      ? "فشل في إنشاء الحساب. حاول مرة أخرى."
      : "Failed to create account. Please try again.",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRule] = useState<Role>("USER");
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

      toast.success(
        ar ? "تم إنشاء الحساب بنجاح" : "Account created successfully"
      );
      if (res?.ok) {
        setCookie("authenticated", "true", { maxAge: 60 * 60 * 24 }); // يوم كامل

        router.push(ar ? "/ar" : "/");
      }
      setError(res?.error || "");
    } catch {
      setError(t.signUpFailed);
      setLoading(false);
    } finally {
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.nameLabel}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder={t.nameLabel}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailLabel}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                {t.roleLabel}
              </label>
              <Select
                dir={ar ? "rtl" : "ltr"}
                required
                onValueChange={(value) => setRule(value as Role)}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder={t.roleLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="USER">{t.roleUser}</SelectItem>
                    <SelectItem value="ADMIN">{t.roleAdmin}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                {t.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t.passwordLabel}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-2"
              >
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder={t.confirmPasswordLabel}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 my-2"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <Input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className={`h-4 w-4 ${ar ? "ml-2" : "mr-2"}`}
              />
              <label htmlFor="terms" className="ml-2  block text-sm">
                {t.tosText}{" "}
                <Link
                  href="/terms"
                  className="text-blue-500 hover:text-blue-600"
                >
                  {t.tosLink}
                </Link>{" "}
                {ar ? "و" : "and"}{" "}
                <Link
                  href="/privacy"
                  className="text-blue-500 hover:text-blue-600"
                >
                  {t.privacyLink}
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              <UserPlus className="mr-2 h-4 w-4" />
              {loading ? t.creatingAccount : t.signUpButton}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t.alreadyAccount}{" "}
            <Link
              href="/auth/signin"
              className="text-blue-500 hover:text-blue-600"
            >
              {t.signIn}
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-sm text-muted-foreground">
                {t.orSignUpWith}
              </span>
            </div>
          </div>

          <div>
            <Button className="w-full" variant="outline" type="button">
              GitHub
            </Button>
            <p className="text-gray-500 text-center">{t.githubComing}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
