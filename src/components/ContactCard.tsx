"use client";

import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  GraduationCap,
} from "lucide-react";

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Hồ Chí Minh, Việt Nam",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "truongnguyenhoang0512@gmail.com",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/50",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "(+84) 973 335 3430",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/50",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Birthday",
    value: "05/12/2002",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/50",
  },
  {
    icon: <User className="w-5 h-5" />,
    label: "Age",
    value: "22 years old",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/50",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Education",
    value: "Đại học Bách Khoa TP.HCM",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/50",
  },
];

interface ContactCardProps {
  className?: string;
}

export default function ContactCard({ className = "" }: ContactCardProps) {
  return (
    <div className={`rounded-lg border bg-card border-border p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
          <User className="w-5 h-5 text-white" />
        </div>
        <h2 className="font-semibold text-xl text-card-foreground">
          Thông Tin Liên Hệ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 p-3 rounded-lg hover:scale-105 enhanced-btn transition-all duration-300 border border-border hover:border-primary/50"
          >
            <div
              className={`p-2 rounded-lg ${info.bgColor} group-hover:scale-110 transition-all duration-300`}
            >
              <div className={info.color}>{info.icon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {info.label}
              </p>
              <p className="text-sm font-medium text-card-foreground truncate">
                {info.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-center text-muted-foreground">
          💼{" "}
          <span className="font-medium text-card-foreground">
            Available for new opportunities
          </span>{" "}
          - Luôn sẵn sàng cho những dự án thú vị!
        </p>
      </div>
    </div>
  );
}
