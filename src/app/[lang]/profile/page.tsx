import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import My_events from "./My-events";
import { authOptions } from "@/lib/auth/auth-options";

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const session = await getServerSession(authOptions);
  const { lang } = await params;

  if (!session || !session.user) {
    redirect("/login");
  }

  const { name, email, role } = session.user as {
    name?: string;
    email?: string;
    role?: string;
  };
  console.log(session);

  const profilePageTitle = lang === "ar" ? "الملف الشخصي" : "User Profile";
  const roleLabel = lang === "ar" ? "الدور" : "Role";
  const userName = name || (lang === "ar" ? "مستخدم" : "User");

  return (
    <div className="min-h-[60vh] mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-6">
      <section aria-labelledby="profile-heading">
        <h1 id="profile-heading" className="sr-only">
          {profilePageTitle}
        </h1>

        <div className="bg-accent rounded-xl shadow-md p-6 mb-10 border border-muted">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Placeholder Avatar */}
            <div className="w-24 h-24 bg-accent-foreground rounded-full flex items-center justify-center text-muted-foreground text-5xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-accent-foreground">
                {userName}
              </h2>
              <p className="text-muted-foreground mt-1">{email}</p>

              <span className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border">
                {roleLabel}: {role}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* my events  */}
      <My_events lang={lang} />
      {/* Event form section */}
    </div>
  );
};

export default page;
