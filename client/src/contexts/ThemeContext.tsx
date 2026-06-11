import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // تفعيل التغيير السلس في الـ CSS للموقع كله وبدون وميض مزعج
    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease');

    if (theme === "dark") {
      root.classList.add("dark");
      // خلفية الـ Dark Mode الفخمة المعتادة متناسقة مع الفوتر والهيدر
      root.style.backgroundColor = "#070f1d"; 
    } else {
      root.classList.remove("dark");
      // التعديل المبهج هنا: أزرق سماوي ناعم ومنعش جداً (Sky 50) بدل الأبيض الصريح الميت
      root.style.backgroundColor = "#f0f9ff"; 
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}