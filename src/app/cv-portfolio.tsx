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
import SplashCursor from "@/components/SplashCursor";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import {
  gradeData,
  skillsData,
  certificates,
  projects,
} from "@/data/constants";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

// Animated Counter Component
const AnimatedCounter = ({
  value,
  suffix = "",
  color,
}: {
  value: string | number;
  suffix?: string;
  color: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let startValue = 0;
          const endValue = parseInt(value.toString());
          const duration = 2000;
          const increment = Math.ceil(endValue / (duration / 30));

          const timer = setInterval(() => {
            startValue += increment;
            if (startValue > endValue) {
              setDisplayValue(endValue);
              clearInterval(timer);
            } else {
              setDisplayValue(startValue);
            }
          }, 30);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value]);

  return (
    <p
      ref={counterRef}
      className={`stat-number text-xl font-semibold animate-pulse-slow ${color}`}
    >
      {displayValue}
      {suffix}
    </p>
  );
};

// Theme Toggle Button Component
const ThemeToggle = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="theme-toggle"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
    </button>
  );
};

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);

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

  // Hàm chuyển đổi dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div
        className={`relative w-full mb-8 ${
          scrolled ? "py-4" : "py-6"
        } bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 transition-all duration-300 shadow-2xl overflow-hidden`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/2 w-60 h-60 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-start py-2">
            <div className="flex items-start gap-8">
              {/* Enhanced Profile Image */}
              <div className="relative group">
                {/* Glowing ring effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

                {/* Main profile image container */}
                <div className="relative w-48 h-48 rounded-full shadow-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 hover:rotate-3 profile-image-container">
                  <Image
                    src="/canhan1.png"
                    alt="Profile"
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Floating elements around profile */}
                <div className="absolute -top-2 -right-2 bg-green-500 w-10 h-10 rounded-full shadow-lg animate-bounce">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-2 bg-blue-500 w-8 h-8 rounded-full shadow-lg animate-bounce delay-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000"></div>

                {/* Floating particles */}
                <div className="floating-particle w-2 h-2 top-8 right-8 animate-pulse delay-500"></div>
                <div className="floating-particle w-1.5 h-1.5 bottom-8 left-8 animate-pulse delay-700"></div>
              </div>

              {/* Enhanced Text Content */}
              <div className="flex-1 space-y-4 animate-slide-in-right">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in gradient-text">
                    Trương Nguyễn Hoàng
                  </h1>
                  <div className="flex items-center gap-3 animate-slide-in-left">
                    <div className="px-4 py-2 rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300 transform">
                      <p className="text-blue-300 font-semibold text-lg">
                        Full Stack Developer
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full hover:scale-105 transition-all duration-300 transform">
                      <span className="text-green-300 text-sm font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-200 leading-relaxed max-w-2xl animate-fade-in">
                  Passionate developer với{" "}
                  <span className="text-yellow-300 font-semibold animate-pulse">
                    1 năm kinh nghiệm
                  </span>{" "}
                  trong việc xây dựng ứng dụng web hiện đại. Chuyên về{" "}
                  <span className="text-blue-300 font-semibold">React</span>,{" "}
                  <span className="text-green-300 font-semibold">Node.js</span>{" "}
                  và{" "}
                  <span className="text-purple-300 font-semibold">
                    cloud technologies
                  </span>
                  .
                </p>

                {/* Enhanced Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in">
                  <div className="group flex items-center gap-3 p-3 rounded-lg hover:scale-105 enhanced-btn transition-all duration-300">
                    <div className="p-2 rounded-lg group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-white font-medium">
                        Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3 p-3 rounded-lg hover:scale-105 enhanced-btn transition-all duration-300">
                    <div className="p-2 rounded-lg group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-white font-medium">
                        truongnguyenhoang0512@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3 p-3 rounded-lg hover:scale-105 enhanced-btn transition-all duration-300">
                    <div className="p-2 rounded-lg group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-white font-medium">
                        (+84) 973 335 3430
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Theme Toggle */}
            <div className="flex items-center justify-center w-20 h-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <ThemeToggle
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 mb-3 justify-start items-center">
            <Button
              variant="outline"
              size="lg"
              className="nav-btn group flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500/50 enhanced-btn transform hover:-translate-y-1"
              asChild
            >
              <a
                href="https://github.com/hoang-0512"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="/30 transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                  </svg>
                </div>
                <span className="font-bold text-lg">GitHub</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="nav-btn group flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 bg-gradient-to-r from-blue-600  to-blue-600 text-white hover:from-blue-500 hover:to-blue-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 enhanced-btn transform hover:-translate-y-1"
              asChild
            >
              <a
                href="https://www.facebook.com/quanghuy.vu.1044186?locale=vi_VN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="/30 transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                  </svg>
                </div>
                <span className="font-bold text-lg">Facebook</span>
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="nav-btn group flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white hover:from-red-500 hover:via-red-400 hover:to-red-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50 enhanced-btn transform hover:-translate-y-1"
              asChild
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=truongnguyenhoang0512@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="/30 transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg">Gmail</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Về tôi - Giới thiệu - Mục tiêu nghề nghiệp */}
        <div className="space-y-6">
          {/* Giới thiệu bản thân */}
          <div className="rounded-lg border bg-card border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className="font-medium text-card-foreground">
                Giới Thiệu Bản Thân
              </h2>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              Xin chào! Tôi là Trương Nguyễn Hoàng, một Full Stack Developer đầy
              đam mê với hơn 1 năm kinh nghiệm trong việc xây dựng các ứng dụng
              web hiện đại. Tôi rất hứng thú với các thay đổi thế giới và luôn
              cố gắng tạo ra những sản phẩm có ý nghĩa.
            </p>
            <p className="text-sm text-muted-foreground">
              Điều tôi yêu thích nhất trong lập trình là khả năng biến những ý
              tưởng thảo thành những sản phẩm thực tế có thể giúp ích cho mọi
              người. Tôi luôn học hỏi các công nghệ mới và không ngừng cải thiện
              kỹ năng của mình.
            </p>
          </div>

          {/* Mục tiêu nghề nghiệp */}
          <div className="rounded-lg border bg-card border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1 1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h2 className="font-medium text-card-foreground">
                Mục Tiêu Nghề Nghiệp
              </h2>
            </div>
            <p className="text-sm mb-4 text-muted-foreground">
              Trở thành một Senior Full Stack Developer trong 2 năm tới, đóng
              góp vào các dự án có tác động tích cực đến cộng đồng và xây dựng
              team phát triển mạnh mẽ.
            </p>
            {/* Thống kê cá nhân */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4 text-card-foreground">
                Thống Kê Cá Nhân
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 bg-secondary hover:bg-accent">
                  <AnimatedCounter
                    value={25}
                    suffix="+"
                    color="text-blue-600 dark:text-blue-400"
                  />
                  <p className="text-xs mt-1 text-muted-foreground">Dự án</p>
                </div>
                <div className="stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 bg-secondary hover:bg-accent">
                  <AnimatedCounter
                    value={3}
                    suffix="+"
                    color="text-green-600 dark:text-green-400"
                  />
                  <p className="text-xs mt-1 text-muted-foreground">Công ty</p>
                </div>
                <div className="stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 bg-secondary hover:bg-accent">
                  <AnimatedCounter
                    value={15}
                    suffix="+"
                    color="text-purple-600 dark:text-purple-400"
                  />
                  <p className="text-xs mt-1 text-muted-foreground">
                    Chứng chỉ
                  </p>
                </div>
                <div className="stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 bg-secondary hover:bg-accent">
                  <AnimatedCounter
                    value={8}
                    suffix=""
                    color="text-orange-600 dark:text-orange-400"
                  />
                  <p className="text-xs mt-1 text-muted-foreground">
                    Công nghệ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic Grades Chart */}
          <div className="rounded-lg border bg-card border-border p-6 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              <h2 className="font-medium text-card-foreground">
                Bảng Điểm Học Tập
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
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
              <p className="text-sm text-muted-foreground">
                Điểm trung bình:{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  8.47/10
                </span>
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-lg border bg-card border-border p-6 transition-colors duration-300">
            <h2 className="font-medium mb-1 text-card-foreground">
              Kỹ Năng Chuyên Môn
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Mức độ thành thạo các công nghệ
            </p>
            <div className="space-y-5">
              {skillsData.map((skill, index) => (
                <div
                  key={index}
                  className="group transition-transform duration-500 ease-out"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-card-foreground">
                      {skill.skill}
                    </span>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden transition-colors duration-300">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out bg-emerald-600 dark:bg-emerald-500 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="rounded-lg border bg-card border-border p-6 overflow-hidden relative">
          <div className="w-full flex flex-col items-start justify-center mb-8">
            <h2 className="font-bold text-4xl md:text-5xl text-left w-full mb-2 tracking-tight text-card-foreground">
              Chứng Chỉ & Giải Thưởng
            </h2>
            <p className="text-lg text-left w-full text-muted-foreground">
              Các chứng chỉ chuyên môn đã đạt được
            </p>
          </div>

          {/* ScrollStack Animation */}
          <div className="h-[600px] w-full">
            <ScrollStack
              itemDistance={80}
              itemScale={0.05}
              itemStackDistance={40}
              stackPosition="25%"
              scaleEndPosition="15%"
              baseScale={0.8}
              rotationAmount={2}
              blurAmount={0.5}
              onStackComplete={() => console.log("Stack animation completed!")}
            >
              {certificates.slice(0, 6).map((cert, idx) => (
                <ScrollStackItem key={idx}>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-6 flex justify-center items-center w-full">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-48 object-contain rounded-2xl border shadow-lg bg-white dark:bg-gray-800"
                        style={{ maxWidth: "100%", maxHeight: "180px" }}
                      />
                    </div>
                    <h4 className="font-semibold text-lg text-center mb-3 text-card-foreground line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-center mb-2 text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>

        {/* Projects */}
        <div className="rounded-lg border bg-card border-border p-6">
          <div className="flex items-center gap-2 mb-1">
            <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="font-medium text-card-foreground">
              Dự Án Đã Thực Hiện
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Các dự án nổi bật trong quá trình học tập và làm việc
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group rounded-lg overflow-hidden bg-secondary hover:bg-accent transition-all duration-300"
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
                  <h3 className="font-medium mb-2 text-card-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-3 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* New buttons with improved visibility */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-card text-card-foreground border-border hover:bg-accent"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span className="font-medium">Git</span>
                        </div>
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white border-blue-300 dark:border-blue-600 hover:bg-blue-200 dark:hover:bg-blue-600"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span className="font-medium">Demo</span>
                        </div>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-medium mb-1 text-card-foreground">Học Vấn</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Quá trình học tập
            </p>
            <div className="space-y-6">
              <div className="relative pl-6 pb-6 border-l-2 border-blue-100 dark:border-blue-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-[3px] border-white" />
                <h4 className="font-medium text-card-foreground"></h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
                  Đại học Bách Khoa TP.HCM
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  2020 - 2024 | GPA: 3.8/4.0
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Chuyên ngành: Kỹ thuật phần mềm
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-green-100 dark:border-green-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-white" />
                <h4 className="font-medium text-card-foreground">
                  Tốt nghiệp THPT
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400 mt-0.5">
                  THPT B Phủ Lý
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  2019-2022
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Khối A - Toán, Lý, Hóa
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-medium mb-1 text-card-foreground">
              Kinh Nghiệm Làm Việc
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Quá trình làm việc
            </p>
            <div className="space-y-6">
              <div className="relative pl-6 pb-6 border-l-2 border-purple-100 dark:border-purple-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-[3px] border-white" />
                <h4 className="font-medium text-card-foreground">
                  Frontend Developer
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-0.5">
                  TechCorp Vietnam
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  01/2024 - Hiện tại
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Phát triển ứng dụng web với React, TypeScript
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-orange-100 dark:border-orange-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-[3px] border-white" />
                <h4 className="font-medium text-card-foreground">
                  Intern Developer
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-0.5">
                  StartupXYZ
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  06/2023 - 12/2023
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Hỗ trợ phát triển features và fix bugs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Trương Nguyễn Hoàng. Được tạo với ❤️ bằng Next.js và Tailwind
            CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
