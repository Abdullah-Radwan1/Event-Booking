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

const Footer = ({ lang }: { lang: string }) => {
  const isArabic = lang === "ar";

  const textAlign = isArabic ? "" : "text-left";

  // Translations
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

  return (
    <footer className="border-t py-8 mt-auto">
      <div className="sm:max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company section */}
          <div className={textAlign}>
            <h3 className="text-lg font-semibold flex items-center">
              <Heart
                className={`h-5 w-5 ${isArabic ? "mx-2" : "mr-2"} text-red-500`}
              />
              Alreeb
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {translations.company[lang as keyof typeof translations.company]}
            </p>
            <div className={`mt-4 flex  space-x-4`}>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={textAlign}>
            <h3 className="text-lg font-semibold mb-3">
              {
                translations.quickLinks[
                  lang as keyof typeof translations.quickLinks
                ]
              }
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}/events`}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Calendar
                    className={`h-4 w-4 ${
                      isArabic ? "mx-2" : "mr-2"
                    } text-red-500`}
                  />
                  {
                    translations.events[
                      lang as keyof typeof translations.events
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/communities`}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Users
                    className={`h-4 w-4 ${
                      isArabic ? "mx-2" : "mr-2"
                    } text-red-500`}
                  />
                  {
                    translations.communities[
                      lang as keyof typeof translations.communities
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Info
                    className={`h-4 w-4 ${
                      isArabic ? "mx-2" : "mr-2"
                    } text-red-500`}
                  />
                  {
                    translations.aboutUs[
                      lang as keyof typeof translations.aboutUs
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/help`}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <HelpCircle
                    className={`h-4 w-4 ${
                      isArabic ? "mx-2" : "mr-2"
                    } text-red-500`}
                  />
                  {
                    translations.helpCenter[
                      lang as keyof typeof translations.helpCenter
                    ]
                  }
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className={textAlign}>
            <h3 className="text-lg font-semibold mb-3">
              {
                translations.stayUpdated[
                  lang as keyof typeof translations.stayUpdated
                ]
              }
            </h3>
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder={
                    translations.emailPlaceholder[
                      lang as keyof typeof translations.emailPlaceholder
                    ]
                  }
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
            <div
              className={`space-y-2 text-sm text-muted-foreground ${
                isArabic ? "" : ""
              }`}
            >
              <div className="flex items-center">
                {isArabic ? (
                  <>
                    <span>contact@alreeb.com</span>
                    <Mail className="h-4 w-4 mx-2 text-red-500" />
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mx-2 text-red-500" />
                    <span>contact@alreeb.com</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {isArabic ? (
                  <>
                    <span>+1 (555) 123-4567</span>
                    <Phone className="h-4 w-4 mx-2 text-red-500" />
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2 text-red-500" />
                    <span>+1 (555) 123-4567</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                {isArabic ? (
                  <>
                    <span>123 Event Street, City</span>
                    <MapPin className="h-4 w-4 mx-2 text-red-500" />
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    <span>123 Event Street, City</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-8 pt-4 border-t text-center text-sm text-muted-foreground `}
        >
          <p>
            &copy; {new Date().getFullYear()} Abdullah Radwan.{" "}
            {
              translations.copyright[
                lang as keyof typeof translations.copyright
              ]
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
