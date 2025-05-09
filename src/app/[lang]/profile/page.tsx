import { getServerSession } from "next-auth";
import React from "react";

import { redirect } from "next/navigation";
import Event_form from "./Event-form";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const session = await getServerSession();
  const { lang } = await params; // Resolving the language parameter
  if (!session || !session.user) {
    redirect("/login");
  }

  const { name, email, role } = session.user as {
    name?: string;
    email?: string;
    role?: string;
  };

  // Adjust profile page based on language
  const profilePageTitle = lang === "ar" ? "الملف الشخصي" : "User Profile";
  const roleLabel = lang === "ar" ? "الدور" : "Role";
  const userName = name || (lang === "ar" ? "مستخدم" : "User");

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-accent rounded-lg shadow p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6 text-accent-foreground">
          {profilePageTitle}
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          <div>
            <h2 className="text-xl font-semibold text-accent-foreground">
              {userName}
            </h2>
            <p className="text-accent-foreground/80">{email}</p>
            <div className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground border border-accent-foreground/20">
              {roleLabel}: {role || (lang === "ar" ? "مستخدم" : "user")}
            </div>
          </div>
        </div>
      </div>

      <Event_form lang={lang} />
    </div>
  );
};

export default ProfilePage;
