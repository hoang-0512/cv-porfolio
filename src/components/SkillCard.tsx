"use client";

import { useState } from "react";
import { Code, TrendingUp, Star } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "other";
  icon: string;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    level: 85,
    category: "frontend",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "frontend",
    icon: "🔷",
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "Next.js",
    level: 75,
    category: "frontend",
    icon: "⚡",
    color: "from-black to-gray-800",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "frontend",
    icon: "🎨",
    color: "from-cyan-400 to-blue-500",
  },

  // Backend
  {
    name: "Node.js",
    level: 75,
    category: "backend",
    icon: "🟢",
    color: "from-green-500 to-green-600",
  },
  {
    name: "Express.js",
    level: 70,
    category: "backend",
    icon: "🚀",
    color: "from-gray-600 to-gray-700",
  },
  {
    name: "Python",
    level: 65,
    category: "backend",
    icon: "🐍",
    color: "from-yellow-500 to-blue-600",
  },

  // Database
  {
    name: "MongoDB",
    level: 70,
    category: "database",
    icon: "🍃",
    color: "from-green-400 to-green-500",
  },
  {
    name: "PostgreSQL",
    level: 60,
    category: "database",
    icon: "🐘",
    color: "from-blue-500 to-indigo-600",
  },

  // Tools
  {
    name: "Git",
    level: 85,
    category: "tools",
    icon: "📝",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Docker",
    level: 60,
    category: "tools",
    icon: "🐳",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "AWS",
    level: 55,
    category: "tools",
    icon: "☁️",
    color: "from-orange-500 to-yellow-500",
  },
];

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  database: "from-purple-500 to-pink-500",
  tools: "from-orange-500 to-red-500",
  other: "from-gray-500 to-slate-500",
};

interface SkillCardProps {
  className?: string;
}

export default function SkillCard({ className = "" }: SkillCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const categories = [
    { key: "all", label: "Tất cả", icon: "🌟" },
    { key: "frontend", label: "Frontend", icon: "⚛️" },
    { key: "backend", label: "Backend", icon: "🟢" },
    { key: "database", label: "Database", icon: "🗄️" },
    { key: "tools", label: "Tools", icon: "🛠️" },
  ];

  return (
    <div className={`rounded-lg border bg-card border-border p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
          <Code className="w-5 h-5 text-white" />
        </div>
        <h2 className="font-semibold text-xl text-card-foreground">
          Kỹ Năng Chuyên Môn
        </h2>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category.key
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 bg-secondary hover:bg-accent"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{skill.icon}</div>
                <div>
                  <h3 className="font-medium text-card-foreground">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize">
                    {skill.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star
                  className={`w-4 h-4 transition-colors duration-300 ${
                    skill.level >= 80
                      ? "text-yellow-500"
                      : skill.level >= 60
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm font-medium text-card-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out relative`}
                style={{ width: `${skill.level}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>

            {/* Hover Info */}
            {hoveredSkill === skill.name && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                <TrendingUp className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">
              Tổng cộng:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {filteredSkills.length}
              </span>{" "}
              kỹ năng
            </p>
            <p className="text-xs text-muted-foreground">
              Trung bình:{" "}
              <span className="font-medium">
                {Math.round(
                  filteredSkills.reduce((acc, skill) => acc + skill.level, 0) /
                    filteredSkills.length
                )}
                %
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Expert Level</p>
            <p className="text-sm font-medium text-card-foreground">
              {filteredSkills.filter((skill) => skill.level >= 80).length} kỹ
              năng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
