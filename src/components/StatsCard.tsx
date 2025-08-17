"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Award, Clock, Target, Zap } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

const stats: Stat[] = [
  {
    id: "projects",
    label: "Dự án hoàn thành",
    value: 25,
    suffix: "+",
    icon: <Target className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/50",
    description: "Dự án web và mobile app",
  },
  {
    id: "companies",
    label: "Công ty đã làm việc",
    value: 3,
    suffix: "+",
    icon: <Users className="w-6 h-6" />,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/50",
    description: "Startup và công ty lớn",
  },
  {
    id: "certificates",
    label: "Chứng chỉ đạt được",
    value: 15,
    suffix: "+",
    icon: <Award className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/50",
    description: "Chứng chỉ chuyên môn",
  },
  {
    id: "technologies",
    label: "Công nghệ sử dụng",
    value: 8,
    suffix: "",
    icon: <Zap className="w-6 h-6" />,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/50",
    description: "Frontend, Backend, Database",
  },
  {
    id: "experience",
    label: "Năm kinh nghiệm",
    value: 1,
    suffix: "+",
    icon: <Clock className="w-6 h-6" />,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/50",
    description: "Phát triển ứng dụng web",
  },
  {
    id: "clients",
    label: "Khách hàng hài lòng",
    value: 12,
    suffix: "+",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/50",
    description: "Feedback tích cực",
  },
];

// Animated Counter Component
const AnimatedCounter = ({
  value,
  suffix = "",
  color,
}: {
  value: number;
  suffix?: string;
  color: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let startValue = 0;
          const endValue = value;
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
    <div
      ref={counterRef}
      className={`text-2xl font-bold ${color} animate-pulse-slow`}
    >
      {displayValue}
      {suffix}
    </div>
  );
};

interface StatsCardProps {
  className?: string;
}

export default function StatsCard({ className = "" }: StatsCardProps) {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  return (
    <div className={`rounded-lg border bg-card border-border p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h2 className="font-semibold text-xl text-card-foreground">
          Thống Kê Cá Nhân
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`group p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer ${
              selectedStat === stat.id
                ? "ring-2 ring-primary/50 bg-accent"
                : "bg-secondary hover:bg-accent"
            }`}
            onClick={() =>
              setSelectedStat(selectedStat === stat.id ? null : stat.id)
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-all duration-300`}
              >
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className="text-right">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-sm font-medium text-card-foreground mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Selected Stat Details */}
      {selectedStat && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-medium text-card-foreground">
              Chi tiết: {stats.find((s) => s.id === selectedStat)?.label}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {stats.find((s) => s.id === selectedStat)?.description}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
            <span>💡</span>
            <span>Click vào thẻ khác để xem chi tiết</span>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Tổng dự án</p>
          <p className="text-lg font-bold text-card-foreground">
            {stats.reduce((acc, stat) => acc + stat.value, 0)}+
          </p>
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Trung bình</p>
          <p className="text-lg font-bold text-card-foreground">
            {Math.round(
              stats.reduce((acc, stat) => acc + stat.value, 0) / stats.length
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
