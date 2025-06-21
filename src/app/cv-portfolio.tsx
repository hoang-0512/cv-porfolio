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
import SplashCursor from '@/components/SplashCursor';
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

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", color }: { value: string | number, suffix?: string, color: string }) => {
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
    <p ref={counterRef} className={`stat-number text-xl font-semibold animate-pulse-slow ${color}`}>
      {displayValue}{suffix}
    </p>
  );
};

// Thêm CSS styles cho animation
const carouselStyles = `
  .certificate-carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
    gap: 20px; /* Add gap between flex items */
  }
  .certificate-item {
    min-width: calc(33.333% - 14px); /* Adjust width to account for gap */
    flex: 0 0 calc(33.333% - 14px);
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
  
  /* Stats animation styles */
  .animate-pulse-slow {
    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
    .stat-number {
    transition: all 0.3s ease;
  }
  
  /* Nav button animations */
  @keyframes gentle-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .nav-btn:hover {
    animation: gentle-pulse 0.8s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stat-number:hover {
    transform: scale(1.2);
    filter: brightness(1.2);
    text-shadow: 0 0 8px currentColor;
  }
  
  .stat-card {
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  .stat-card:hover::before {
    transform: translateX(100%);
  }
  
  /* Animation for fade-in and slide-up */
  .fade-in-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
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
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Animation for scroll into view
  const gradeRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const [gradeVisible, setGradeVisible] = useState(false);
  const [skillVisible, setSkillVisible] = useState(false);

  useEffect(() => {
    const handleObserver = (
      ref: React.RefObject<HTMLDivElement | null>,
      setVisible: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref.current);
    };
    handleObserver(gradeRef, setGradeVisible);
    handleObserver(skillRef, setSkillVisible);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >      {/* Fluid cursor effect */}
      {/* <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>        <SplashCursor 
          SPLAT_RADIUS={0.06}
          CURL={0.6}
          DENSITY_DISSIPATION={9.5}
          VELOCITY_DISSIPATION={6.5}
          COLOR_UPDATE_SPEED={3}
          SPLAT_FORCE={1500}
          TRANSPARENT={true}
        />
      </div> */}
      
      {/* Inject CSS styles */}
      <style>{carouselStyles}</style>      {/* Header */}      <div
        className={`relative w-full mb-8 ${scrolled ? 'py-4' : 'py-6'} ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b transition-all duration-300 shadow-sm`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start py-2">
            <div className="flex items-start gap-6">
              <div className="relative animate-float mt-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"></div>
                <Image
                src="/src/public/Screenshot 2025-06-20 234519.png"
                alt="Profile"
                width={140}
                height={140}
                className="relative rounded-full border-4 border-white shadow-xl"
                />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
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

          </div>          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 mb-3 justify-start items-center bg-opacity-50 rounded-lg py-2">
            <Button
              variant={darkMode ? "ghost" : "outline"}
              size="sm"
              className={`nav-btn flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                darkMode 
                  ? "bg-gray-700/40 text-gray-200 border-gray-600 hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-700" 
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              }`}
              asChild
            >
              <a href="https://github.com/hoang-0512" target="_blank" rel="noopener noreferrer">
                {/* GitHub icon */}
                <svg className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                </svg>
                GitHub
              </a>
            </Button>
            <Button
              variant={darkMode ? "ghost" : "outline"}
              size="sm"
              className={`nav-btn flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                darkMode 
                  ? "bg-gray-700/40 text-gray-200 border-gray-600 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-700" 
                  : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
              }`}
              asChild
            >
              <a href="https://www.facebook.com/quanghuy.vu.1044186?locale=vi_VN" target="_blank" rel="noopener noreferrer">
                {/* Facebook icon */}
                <svg className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                </svg>
                Facebook
              </a>
            </Button>
            <Button
              variant={darkMode ? "ghost" : "outline"}
              size="sm"
              className={`nav-btn flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                darkMode 
                  ? "bg-gray-700/40 text-gray-200 border-gray-600 hover:bg-green-600/20 hover:text-green-400 hover:border-green-700" 
                  : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
              }`}
              asChild
            >
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=truongnguyenhoang0512@gmail.com" target="_blank" rel="noopener noreferrer">
                {/* Mail icon */}
                <Mail className={`w-4 h-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                Gmail
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
          <div className={`rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-1.5 rounded-full ${darkMode ? "bg-blue-900/50" : "bg-blue-100"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                Giới Thiệu Bản Thân
              </h2>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Xin chào! Tôi là Trương Nguyễn Hoàng, một Full Stack Developer đầy 
              đam mê với hơn 1 năm kinh nghiệm trong việc xây dựng các 
              ứng dụng web hiện đại. Tôi rất hứng thú với các thay đổi thế giới
              và luôn cố gắng tạo ra những sản phẩm có ý nghĩa.
            </p>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Điều tôi yêu thích nhất trong lập trình là khả năng biến những ý 
              tưởng thảo thành những sản phẩm thực tế có thể giúp ích 
              cho mọi người. Tôi luôn học hỏi các công nghệ mới và không 
              ngừng cải thiện kỹ năng của mình.
            </p>
          </div>

          {/* Mục tiêu nghề nghiệp */}
          <div className={`rounded-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-1.5 rounded-full ${darkMode ? "bg-green-900/50" : "bg-green-100"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
              </div>
              <h2 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                Mục Tiêu Nghề Nghiệp
              </h2>
            </div>
            <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Trở thành một Senior Full Stack Developer trong 2 năm tới, đóng 
              góp vào các dự án có tác động tích cực đến cộng đồng và xây 
              dựng team phát triển mạnh mẽ.
            </p>
              {/* Thống kê cá nhân */}
            <div className="mt-6">
              <h3 className={`text-sm font-medium mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                Thống Kê Cá Nhân
              </h3>              <div className="grid grid-cols-4 gap-4 text-center">
                <div className={`stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 ${darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                  <AnimatedCounter 
                    value={25} 
                    suffix="+" 
                    color={darkMode ? "text-blue-400" : "text-blue-600"}
                  />
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Dự án</p>
                </div>
                <div className={`stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 ${darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                  <AnimatedCounter 
                    value={3} 
                    suffix="+" 
                    color={darkMode ? "text-green-400" : "text-green-600"}
                  />
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Công ty</p>
                </div>
                <div className={`stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 ${darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                  <AnimatedCounter 
                    value={15} 
                    suffix="+" 
                    color={darkMode ? "text-purple-400" : "text-purple-600"}
                  />
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Chứng chỉ</p>
                </div>
                <div className={`stat-card p-3 rounded-md transform transition-all duration-300 hover:scale-105 ${darkMode ? "bg-gray-700/50 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                  <AnimatedCounter 
                    value={8} 
                    suffix="" 
                    color={darkMode ? "text-orange-400" : "text-orange-600"}
                  />
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Công nghệ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic Grades Chart */}
          <div
            ref={gradeRef}
            className={`rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 transition-colors duration-300 fade-in-up${gradeVisible ? ' visible' : ''}`}
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
            ref={skillRef}
            className={`rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } p-6 transition-colors duration-300 fade-in-up${skillVisible ? ' visible' : ''}`}
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
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* New buttons with improved visibility */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`flex-1 ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
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
                      className={`flex-1 ${
                        darkMode
                          ? "bg-blue-700 text-white border-blue-600 hover:bg-blue-600"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
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
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-medium mb-1">Học Vấn</h2>
            <p className="text-sm text-gray-500 mb-6">Quá trình học tập</p>
            <div className="space-y-6">
              <div className="relative pl-6 pb-6 border-l-2 border-blue-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-[3px] border-white" />
                <h4 className="font-medium text-gray-900">
                  
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
                <p className="text-sm text-green-600 mt-0.5">THPT B Phủ Lý</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  2019-2022
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
