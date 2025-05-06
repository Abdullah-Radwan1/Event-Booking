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

const Footer = () => {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="sm:max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company section */}
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Heart className="h-5 w-5 mr-2 text-blue-500" />
              Alreeb
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Find your people, discover interests, and join inspiring events.
            </p>
            <div className="mt-4 flex space-x-4">
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
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Info className="h-4 w-4 mr-2 text-blue-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="pr-10"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-500" />
                <span>contact@alreeb.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                <span>123 Event Street, City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Abdullah Radwan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
