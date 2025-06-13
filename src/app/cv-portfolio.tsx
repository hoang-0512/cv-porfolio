"use client";

import {
  Award,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  Star,
  Sun,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const gradeData = [
  { subject: "Toán", grade: 8.5 },
  { subject: "Lý", grade: 9.0 },
  { subject: "Hóa", grade: 8.2 },
  { subject: "Anh", grade: 8.8 },
  { subject: "Tin", grade: 9.5 },
  { subject: "Văn", grade: 7.8 },
];

const skillsData = [
  { skill: "JavaScript", level: 90 },
  { skill: "React", level: 85 },
  { skill: "Node.js", level: 80 },
  { skill: "Python", level: 75 },
  { skill: "SQL", level: 70 },
  { skill: "UI/UX", level: 65 },
];

const certificates = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Google Analytics Certified",
    issuer: "Google",
    date: "2023",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "React Developer Certificate",
    issuer: "Meta",
    date: "2023",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    date: "2022",
    image: "/placeholder.svg?height=60&width=60",
  },
];

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "Xây dựng nền tảng thương mại điện tử với React, Node.js và MongoDB. Tích hợp thanh toán online và quản lý kho hàng.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/ecommerce",
    demo: "https://demo-ecommerce.com",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Task Management App",
    description:
      "Ứng dụng quản lý công việc với tính năng real-time collaboration, drag & drop và notification system.",
    tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
    github: "https://github.com/username/taskapp",
    demo: "https://demo-taskapp.com",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Weather Dashboard",
    description:
      "Dashboard hiển thị thông tin thời tiết với charts và maps tương tác, sử dụng API từ OpenWeatherMap.",
    tech: ["Vue.js", "Chart.js", "Leaflet", "API"],
    github: "https://github.com/username/weather",
    demo: "https://demo-weather.com",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Kiểm tra theme từ localStorage hoặc system preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-10 mb-6 ${
          darkMode
            ? "bg-gray-800/95 border-gray-700"
            : "bg-white/95 border-gray-200"
        } backdrop-blur-sm border-b transition-colors duration-300`}
      >
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full bg-gray-100"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-2.5 h-2.5 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h1
                  className={`text-xl font-semibold mb-1 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Nguyễn Văn An
                </h1>
                <p
                  className={`${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  } hover:text-blue-500 transition-colors mb-1`}
                >
                  Full Stack Developer
                </p>
                <p
                  className={`text-sm mb-2 max-w-2xl ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Passionate developer với 3+ năm kinh nghiệm trong việc xây
                  dựng ứng dụng web hiện đại. Chuyên về React, Node.js và cloud
                  technologies.
                </p>
                <div
                  className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Hồ Chí Minh, Việt Nam
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    nguyenvanan@email.com
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    (+84) 123 456 789
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className={`h-8 ${darkMode ? "text-white border-gray-700" : ""}`}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic Grades Chart */}
          <div
            className={`rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 transition-colors duration-300`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Star
                className={`w-4 h-4 ${
                  darkMode ? "text-yellow-400" : "text-yellow-500"
                }`}
              />
              <h2
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Bảng Điểm Học Tập
              </h2>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } mb-4`}
            >
              Điểm trung bình các môn học chính
            </p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gradeData}
                  margin={{ top: 0, right: 0, bottom: 0, left: -15 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="subject"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#9CA3AF" : "#4B5563",
                    }}
                  />
                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#9CA3AF" : "#4B5563",
                    }}
                  />
                  <Bar
                    dataKey="grade"
                    fill={darkMode ? "#10B981" : "#14b8a6"}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Điểm trung bình:{" "}
                <span
                  className={`font-medium ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  8.47/10
                </span>
              </p>
            </div>
          </div>

          {/* Skills */}
          <div
            className={`rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 transition-colors duration-300`}
          >
            <h2
              className={`font-medium mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Kỹ Năng Chuyên Môn
            </h2>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } mb-6`}
            >
              Mức độ thành thạo các công nghệ
            </p>
            <div className="space-y-5">
              {skillsData.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span
                      className={`font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {skill.skill}
                    </span>
                    <span
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className={`h-2 w-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } rounded-full overflow-hidden transition-colors duration-300`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        darkMode ? "bg-emerald-500" : "bg-emerald-600"
                      } group-hover:${
                        darkMode ? "bg-emerald-400" : "bg-emerald-500"
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div
          className={`rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-6`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Award
              className={`w-4 h-4 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            />
            <h2
              className={`font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Chứng Chỉ & Giải Thưởng
            </h2>
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } mb-6`}
          >
            Các chứng chỉ chuyên môn đã đạt được
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className={`group p-4 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } border ${
                  darkMode
                    ? "border-gray-600 hover:border-gray-500"
                    : "border-gray-200 hover:border-gray-400"
                } rounded-lg transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-[60px] h-[60px] mb-4">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4
                    className={`font-medium text-sm mb-1 transition-colors ${
                      darkMode
                        ? "text-gray-100 group-hover:text-blue-400"
                        : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    {cert.name}
                  </h4>
                  <p
                    className={`text-xs mb-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-1">
                    <Calendar
                      className={`w-3 h-3 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {cert.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div
          className={`rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-6`}
        >
          <div className="flex items-center gap-2 mb-1">
            <ExternalLink
              className={`w-4 h-4 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h2
              className={`font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dự Án Đã Thực Hiện
            </h2>
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } mb-6`}
          >
            Các dự án nổi bật trong quá trình học tập và làm việc
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-lg overflow-hidden ${
                  darkMode
                    ? "bg-gray-700/50 hover:bg-gray-700/70"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition-all duration-300`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className={`font-medium mb-2 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`text-xs px-2 py-1 rounded-full ${
                          darkMode
                            ? "bg-gray-600 text-gray-200"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-medium mb-1">Học Vấn</h2>
            <p className="text-sm text-gray-500 mb-6">Quá trình học tập</p>
            <div className="space-y-6">
              <div className="relative pl-6 pb-6 border-l-2 border-blue-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-[3px] border-white" />
                <h4 className="font-medium text-gray-900">
                  Cử Nhân Công Nghệ Thông Tin
                </h4>
                <p className="text-sm text-blue-600 mt-0.5">
                  Đại học Bách Khoa TP.HCM
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  2020 - 2024 | GPA: 3.8/4.0
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Chuyên ngành: Kỹ thuật phần mềm
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-green-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-white" />
                <h4 className="font-medium text-gray-900">Tốt nghiệp THPT</h4>
                <p className="text-sm text-green-600 mt-0.5">THPT Lê Quý Đôn</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  2017 - 2020 | Điểm TB: 8.5/10
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Khối A - Toán, Lý, Hóa
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-medium mb-1">Kinh Nghiệm Làm Việc</h2>
            <p className="text-sm text-gray-500 mb-6">Quá trình làm việc</p>
            <div className="space-y-6">
              <div className="relative pl-6 pb-6 border-l-2 border-purple-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-[3px] border-white" />
                <h4 className="font-medium text-gray-900">
                  Frontend Developer
                </h4>
                <p className="text-sm text-purple-600 mt-0.5">
                  TechCorp Vietnam
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  01/2024 - Hiện tại
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Phát triển ứng dụng web với React, TypeScript
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-orange-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-[3px] border-white" />
                <h4 className="font-medium text-gray-900">Intern Developer</h4>
                <p className="text-sm text-orange-600 mt-0.5">StartupXYZ</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  06/2023 - 12/2023
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Hỗ trợ phát triển features và fix bugs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">
            © 2024 Nguyễn Văn An. Được tạo với ❤️ bằng Next.js và Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
