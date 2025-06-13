"use client";

import {
  Award,
  Calendar,
  ExternalLink,
  Mail,
  MapPin,
  Moon,
  Phone,
  Star,
  Sun,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { gradeData, skillsData, certificates } from "@/data/constants";

const projects = [
  // ... giữ nguyên projects data
];

// Thêm CSS styles cho animation
const carouselStyles = `
  .certificate-carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .certificate-item {
    min-width: 33.333%;
    flex: 0 0 33.333%;
    padding: 0 8px;
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  .certificate-item-entering {
    opacity: 0;
    transform: translateX(20px);
  }
  .certificate-item-exiting {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const certificatesPerPage = 3;
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Theme handling
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

  // Carousel rotation with transition
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((current) =>
          current + certificatesPerPage >= certificates.length
            ? 0
            : current + certificatesPerPage
        );
        setIsTransitioning(false);
      }, 500); // Match with CSS transition duration
    }, 5000);

    return () => clearInterval(timer);
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

  const visibleCertificates = certificates.slice(
    activeIndex,
    activeIndex + certificatesPerPage
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Inject CSS styles */}
      <style>{carouselStyles}</style>

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
                  Trương Nguyễn Hoàng
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
                  Passionate developer với 1 năm kinh nghiệm trong việc xây dựng
                  ứng dụng web hiện đại. Chuyên về React, Node.js và cloud
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
                    truongnguyenhoang0512@gmail.com
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    (+84) 973 335 3430
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

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Star className="w-4 h-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              Gmail
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
              Điểm trung bình các kì học
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
                  <Tooltip
                    cursor={{
                      fill: darkMode
                        ? "rgba(55, 65, 81, 0.3)"
                        : "rgba(229, 231, 235, 0.3)",
                    }}
                    contentStyle={{
                      backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                      border: "none",
                      borderRadius: "6px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    }}
                    labelStyle={{ color: darkMode ? "#E5E7EB" : "#374151" }}
                    itemStyle={{ color: darkMode ? "#10B981" : "#14b8a6" }}
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

        {/* Certificates Section */}
        <div
          className={`rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-6 overflow-hidden`}
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

          {/* Certificate Carousel */}
          <div className="relative overflow-hidden">
            <div className="certificate-carousel flex">
              {visibleCertificates.map((cert, index) => (
                <div
                  key={`${activeIndex}-${index}`}
                  className={`certificate-item p-4 ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } border ${
                    darkMode
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-200 hover:border-gray-400"
                  } rounded-lg transition-colors duration-300 flex flex-col ${
                    isTransitioning
                      ? index === 0
                        ? "certificate-item-entering"
                        : "certificate-item-exiting"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center mb-4 h-16">
                    <div className="relative w-[50px] h-[50px] flex-shrink-0">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4
                      className={`font-medium text-sm text-center mb-2 line-clamp-2 h-10 ${
                        darkMode
                          ? "text-gray-100 group-hover:text-blue-400"
                          : "text-gray-800 group-hover:text-blue-600"
                      }`}
                    >
                      {cert.name}
                    </h4>
                    <div className="mt-auto">
                      <p
                        className={`text-xs text-center mb-1 truncate ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-center gap-1">
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
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from(
                {
                  length: Math.ceil(certificates.length / certificatesPerPage),
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setActiveIndex(i * certificatesPerPage);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(activeIndex / certificatesPerPage) === i
                        ? darkMode
                          ? "bg-green-400"
                          : "bg-green-600"
                        : darkMode
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                )
              )}
            </div>
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
            © 2025 Trương Nguyễn Hoàng. Được tạo với ❤️ bằng Next.js và Tailwind
            CSS
          </p>
        </div>
      </footer>
    </div>
  );
}