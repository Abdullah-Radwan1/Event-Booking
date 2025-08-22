import React from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Info,
  HelpCircle,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Extracted translations for cleaner typing
const translations = {
  company: {
    en: "Find your people, discover interests, and join inspiring events.",
    ar: "ابحث عن أشخاص يشاركونك اهتماماتك، اكتشف اهتمامات جديدة، وانضم إلى أحداث ملهمة.",
  },
  quickLinks: {
    en: "Quick Links",
    ar: "روابط سريعة",
  },
  events: {
    en: "Events",
    ar: "الفعاليات",
  },
  communities: {
    en: "Communities",
    ar: "المجتمعات",
  },
  aboutUs: {
    en: "About Us",
    ar: "من نحن",
  },
  helpCenter: {
    en: "Help Center",
    ar: "مركز المساعدة",
  },
  stayUpdated: {
    en: "Stay Updated",
    ar: "ابق على اطلاع",
  },
  emailPlaceholder: {
    en: "Your email",
    ar: "بريدك الإلكتروني",
  },
  copyright: {
    en: "All rights reserved",
    ar: "جميع الحقوق محفوظة",
  },
};

type TranslationKey = keyof typeof translations;

const Footer = ({ lang }: { lang: string }) => {
  const isArabic = lang === "ar";

  const t = (key: TranslationKey): string =>
    translations[key][lang as "en" | "ar"];

  const socialLinks = [Twitter, Facebook, Instagram, Github];

  const quickLinks: {
    href: string;
    label: TranslationKey;
    icon: React.ElementType;
  }[] = [
    { href: "events", label: "events", icon: Calendar },
    { href: "communities", label: "communities", icon: Users },
    { href: "about", label: "aboutUs", icon: Info },
    { href: "help", label: "helpCenter", icon: HelpCircle },
  ];

  const contactInfo = [
    { text: "abdallahbeedo5584@gmail.com", icon: Mail },
    { text: "+1 (555) 123-4567", icon: Phone },
    { text: "123 Event Street, City", icon: MapPin },
  ];

  const FlexText = ({ icon: Icon, text }: { icon: any; text: string }) => (
    <div className="flex items-center">
      {isArabic ? (
        <>
          <span>{text}</span>
          <Icon className="h-4 w-4 mx-2 text-red-500" />
        </>
      ) : (
        <>
          <Icon className="h-4 w-4 mr-2 text-red-500" />
          <span>{text}</span>
        </>
      )}
    </div>
  );

  return (
    <footer className="border-t py-8 mt-auto">
      <div className="sm:max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Heart
                className={`h-5 w-5 ${isArabic ? "mx-2" : "mr-2"} text-red-500`}
              />
              Abdullah Radwan
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{t("company")}</p>
            <div className="mt-4 flex space-x-4 ">
              {socialLinks.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isArabic ? "text-right" : "text-left"}`}>
            <h3 className="text-lg font-semibold mb-3">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={`/${lang}/${href}`}
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isArabic ? "mx-2" : "mr-2"
                      } text-red-500`}
                    />
                    {t(label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className={`${isArabic ? "text-right" : "text-left"}`}>
            <h3 className="text-lg font-semibold mb-3">{t("stayUpdated")}</h3>
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className={isArabic ? "pl-10" : "pr-10"}
                />
                <Button
                  size="icon"
                  className={`absolute ${
                    isArabic ? "left-1" : "right-1"
                  } top-1/2 -translate-y-1/2 h-7 w-7`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              {contactInfo.map(({ text, icon }, i) => (
                <FlexText key={i} icon={icon} text={text} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Abdullah Radwan. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
