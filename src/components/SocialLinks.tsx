"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  colors: {
    from: string;
    via: string;
    to: string;
    hoverFrom: string;
    hoverVia: string;
    hoverTo: string;
    shadow: string;
  };
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/hoang-0512",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
    colors: {
      from: "from-gray-800",
      via: "via-gray-700",
      to: "to-gray-800",
      hoverFrom: "hover:from-gray-700",
      hoverVia: "hover:via-gray-600",
      hoverTo: "hover:to-gray-700",
      shadow: "hover:shadow-gray-500/50",
    },
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/quanghuy.vu.1044186?locale=vi_VN",
    icon: (
      <svg
        className="w-6 h-6 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
    colors: {
      from: "from-blue-600",
      via: "via-blue-500",
      to: "to-blue-600",
      hoverFrom: "hover:from-blue-500",
      hoverVia: "hover:via-blue-400",
      hoverTo: "hover:to-blue-500",
      shadow: "hover:shadow-blue-500/50",
    },
  },
  {
    name: "Gmail",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=truongnguyenhoang0512@gmail.com",
    icon: <Mail className="w-6 h-6 text-white" />,
    colors: {
      from: "from-red-600",
      via: "via-red-500",
      to: "to-red-600",
      hoverFrom: "hover:from-red-500",
      hoverVia: "hover:via-red-400",
      hoverTo: "hover:to-red-500",
      shadow: "hover:shadow-red-500/50",
    },
  },
];

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={`nav-btn group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-gradient-to-r ${link.colors.from} ${link.colors.via} ${link.colors.to} text-white ${link.colors.hoverFrom} ${link.colors.hoverVia} ${link.colors.hoverTo} hover:scale-105 hover:shadow-md ${link.colors.shadow} enhanced-btn transform hover:-translate-y-1`}
          asChild
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <div className="p-1.5 bg-white/20 rounded-md group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              {link.icon}
            </div>
            <span className="font-medium text-sm">{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
