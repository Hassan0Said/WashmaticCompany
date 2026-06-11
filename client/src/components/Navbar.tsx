import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Menu, X, Heart } from 'lucide-react';
import logo from "../images/logo.png";

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'nav.home' },
    { path: '/products', label: 'nav.products' },
    { path: '/agencies', label: 'nav.agencies' },
    { path: '/contact', label: 'nav.contact' },
  ];

  return (
    <header className="sticky top-0 w-full bg-blue-950 text-white shadow-lg z-[999]">
      {/* تم استبدال container بـ w-full لضمان السيطرة الكاملة على المسافات */}
      <div className="w-full px-3 md:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* اللوجو والاسم: أضفنا min-w-0 لضمان أن النص يأخذ مساحته ولا ينضغط */}
        <Link href="/">
          <a className="flex items-center gap-2 flex-shrink-0 min-w-0">
            <img src={logo} alt="Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain bg-white rounded p-1" />
            <span className="font-bold text-sm sm:text-lg truncate block">
              {t('hero.title')}
            </span>
          </a>
        </Link>

        {/* قائمة الديسكتوب */}
        <nav className="hidden lg:flex flex-grow justify-center items-center gap-8">
          {navLinks.map(({ path, label }) => (
            <Link key={path} href={path}>
              <a className={`text-sm font-medium transition-colors hover:text-blue-300 ${location === path ? 'text-blue-300' : 'text-white'}`}>
                {t(label)}
              </a>
            </Link>
          ))}
        </nav>

        {/* أيقونات الأدوات */}
        <div className="hidden lg:flex items-center gap-4 border-s border-blue-800 ps-6">
          <Link href="/favorites"><a className="hover:text-blue-300"><Heart size={20} /></a></Link>
          <button onClick={toggleTheme} className="hover:text-blue-300">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="text-xs font-bold border px-2 py-1 rounded hover:bg-blue-800 transition-colors">
            {language === 'ar' ? 'EN' : 'AR'}
          </button>
        </div>

        {/* زر المنيو للموبايل */}
        <button className="lg:hidden p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {isOpen && (
        <div className="lg:hidden bg-blue-900 border-t border-blue-800 p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {navLinks.map(({ path, label }) => (
            <Link key={path} href={path}>
              <a onClick={() => setIsOpen(false)} className={`py-3 px-2 border-b border-blue-800 ${location === path ? 'text-blue-300' : 'text-white'}`}>
                {t(label)}
              </a>
            </Link>
          ))}
          <div className="flex justify-between items-center pt-4 px-2">
            <Link href="/favorites"><a onClick={() => setIsOpen(false)}><Heart size={24} /></a></Link>
            <button onClick={toggleTheme}>{theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}</button>
            <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="font-bold text-lg">
               {language === 'ar' ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;