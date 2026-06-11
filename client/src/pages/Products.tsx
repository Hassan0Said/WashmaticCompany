import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ArrowRight, Heart, ShoppingCart, Star, Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import electrical1 from  '../images/جهاز_كهربائي_متميز.jpg';
import electrical2 from '../images/وحدة_طاقة_صناعية_كبيرة.png';
import electrical3 from  '../images/لوحة_تحكم_ذكية.jpg';

import heater1 from '../images/سخان_مائي_كهربائي.webp';
import heater2 from  '../images/سخان_محمول.webp';
import heater3 from '../images/سخان_صناعي.webp';

import iron1 from  '../images/مكواة_بخار_برو.jpg';
import iron2 from  '../images/مكوارة_رقمية.webp';
import iron3 from  '../images/مكواة_قوية_ومتينة.webp';

import car1 from '../images/طقم_محرك.jpg';
import car2 from '../images/بطاريات_السيارة.jpg';
import car3 from '../images/ناقل_حركة_سيارة.jpg';
import car4 from  '../images/مجموعة_فلاتر_سيارات.jpg';

import kitchen1 from '../images/طقم_أواني_طهي.webp';
import kitchen2 from '../images/أدوات_مطبخ_برو.jpg';
import kitchen3 from '../images/خلاط_كهربائي.webp';
import kitchen4 from '../images/كاتل_كهربائي.webp';

import washer1 from '../images/غسالة_ذكية.webp';
import washer2 from '../images/غسالة_صغيرة.jpg';
import washer3 from '../images/غسالة_أطباق.jpg';

const Products = () => {
  const { t, language, dir } = useLanguage();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // جلب القسم من الرابط تلقائياً عند التحميل
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, [location]);

  const categories = [
    { value: 'all', label: t('products.all') },
    { value: 'electrical', label: language === 'ar' ? 'الأجهزة الكهربائية' : 'Electrical Appliances' },
    { value: 'heaters', label: language === 'ar' ? 'السخانات الكهربائية' : 'Electric Heaters' },
    { value: 'irons', label: language === 'ar' ? 'المكاوي' : 'Irons' },
    { value: 'carparts', label: language === 'ar' ? 'قطع غيار السيارات' : 'Car Spare Parts' },
    { value: 'kitchen', label: language === 'ar' ? 'أدوات المطبخ' : 'Kitchen Tools' },
    { value: 'washers', label: language === 'ar' ? 'الغسالات' : 'Washing Machines' },
  ];

  const allProducts = [
    // ELECTRICAL
    {
      id: 1,
      name: 'Premium Electrical Appliance',
      ar: 'جهاز كهربائي متميز',
      category: 'electrical',
      image: electrical1,
      rating: 4.8,
      desc: { en: 'High efficiency electrical device', ar: 'جهاز كهربائي عالي الكفاءة' }
    },
    {
      id: 2,
      name: 'Industrial Power Unit',
      ar: 'وحدة طاقة صناعية',
      category: 'electrical',
      image: electrical2,
      rating: 4.7,
      desc: { en: 'Heavy-duty industrial power system', ar: 'نظام طاقة صناعي قوي' }
    },
    {
      id: 3,
      name: 'Smart Control Panel',
      ar: 'لوحة تحكم ذكية',
      category: 'electrical',
      image: electrical3,
      rating: 4.6,
      desc: { en: 'Advanced smart control system', ar: 'نظام تحكم ذكي متطور' }
    },

    // HEATERS
    {
      id: 4,
      name: 'Electric Water Heater',
      ar: 'سخان ماء كهربائي',
      category: 'heaters',
      image: heater1,
      rating: 4.6,
      desc: { en: 'Fast heating water system', ar: 'نظام تسخين سريع للمياه' }
    },
    {
      id: 5,
      name: 'Portable Heater',
      ar: 'سخان محمول',
      category: 'heaters',
      image: heater2,
      rating: 4.4,
      desc: { en: 'Compact portable heating device', ar: 'سخان صغير وسهل الحمل' }
    },
    {
      id: 6,
      name: 'Industrial Heater',
      ar: 'سخان صناعي',
      category: 'heaters',
      image: heater3,
      rating: 4.7,
      desc: { en: 'High power industrial heater', ar: 'سخان صناعي عالي القدرة' }
    },

    // IRONS
    {
      id: 7,
      name: 'Steam Iron Pro',
      ar: 'مكواة بخار برو',
      category: 'irons',
      image: iron1,
      rating: 4.7,
      desc: { en: 'Professional steam ironing system', ar: 'مكواة بخار احترافية' }
    },
    {
      id: 8,
      name: 'Digital Iron',
      ar: 'مكواة رقمية',
      category: 'irons',
      image: iron2,
      rating: 4.6,
      desc: { en: 'Smart temperature control iron', ar: 'مكواة بتحكم ذكي في الحرارة' }
    },
    {
      id: 9,
      name: 'Heavy Duty Iron',
      ar: 'مكواة قوية',
      category: 'irons',
      image: iron3,
      rating: 4.5,
      desc: { en: 'Strong durable ironing tool', ar: 'مكواة قوية ومتينة' }
    },

    // CAR PARTS
    {
      id: 10,
      name: 'Engine Kit',
      ar: 'طقم محرك',
      category: 'carparts',
      image: car1,
      rating: 4.7,
      desc: { en: 'Complete engine replacement kit', ar: 'طقم محرك كامل' }
    },
    {
      id: 11,
      name: 'Car Battery',
      ar: 'بطارية سيارة',
      category: 'carparts',
      image: car2,
      rating: 4.6,
      desc: { en: 'High performance car battery', ar: 'بطارية سيارة عالية الأداء' }
    },
    {
      id: 12,
      name: 'Transmission System',
      ar: 'ناقل الحركة',
      category: 'carparts',
      image: car3,
      rating: 4.5,
      desc: { en: 'Automatic transmission system', ar: 'نظام ناقل حركة أوتوماتيك' }
    },
    {
      id: 13,
      name: 'Car Filters Set',
      ar: 'مجموعة فلاتر سيارات',
      category: 'carparts',
      image: car4,
      rating: 4.5,
      desc: { en: 'Air and oil filters set', ar: 'مجموعة فلاتر هواء وزيت' }
    },

    // KITCHEN
    {
      id: 14,
      name: 'Cookware Set',
      ar: 'طقم أواني طهي',
      category: 'kitchen',
      image: kitchen1,
      rating: 4.9,
      desc: { en: 'Premium stainless cookware set', ar: 'طقم أواني ستانلس ممتاز' }
    },
    {
      id: 15,
      name: 'Kitchen Tools Pro',
      ar: 'أدوات مطبخ برو',
      category: 'kitchen',
      image: kitchen2,
      rating: 4.8,
      desc: { en: 'Professional kitchen tools set', ar: 'أدوات مطبخ احترافية' }
    },
    {
      id: 16,
      name: 'Blender Set',
      ar: 'خلاط كهربائي',
      category: 'kitchen',
      image: kitchen3,
      rating: 4.7,
      desc: { en: 'High speed blender machine', ar: 'خلاط عالي السرعة' }
    },
    {
      id: 17,
      name: 'Electric Kettle',
      ar: 'كاتل كهربائي',
      category: 'kitchen',
      image: kitchen4,
      rating: 4.6,
      desc: { en: 'Fast boiling electric kettle', ar: 'غلاية مياه كهربائية سريعة' }
    },

    // WASHERS
    {
      id: 18,
      name: 'Smart Washer',
      ar: 'غسالة ذكية',
      category: 'washers',
      image: washer1,
      rating: 4.9,
      desc: { en: 'AI powered washing machine', ar: 'غسالة ذكية بالذكاء الاصطناعي' }
    },
    {
      id: 19,
      name: 'Mini Washer',
      ar: 'غسالة صغيرة',
      category: 'washers',
      image: washer2,
      rating: 4.4,
      desc: { en: 'Compact washing machine', ar: 'غسالة صغيرة الحجم' }
    },
    {
      id: 20,
      name: 'Dishwasher',
      ar: 'غسالة أطباق',
      category: 'washers',
      image: washer3,
      rating: 4.7,
      desc: { en: 'Automatic dishwashing machine for kitchen use', ar: 'غسالة أطباق أوتوماتيك للمطبخ' }
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const name = language === 'ar' ? product.ar : product.name;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-orange-600 selection:text-white" dir={dir}>
      <Navbar />

      {/* ================= HEADER SECTION (BLUE-950 BACKGROUND) ================= */}
      <section className="pt-44 pb-16 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950/90 relative">
        {/* شبكة هندسية صناعية متناسقة مع الهوية الجديدة */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4 text-white">
              {t('products.title')}
            </h1>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto mb-6 rounded-full" />
            <p className="text-base md:text-lg text-blue-100 font-medium leading-relaxed">
              {language === 'ar' ? 'اكتشف مجموعتنا المتميزة من المنتجات والحلول الصناعية عالية الأداء المعتمدة.' : 'Discover our premium collection of industrial products and certified heavy-duty solutions.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= SEARCH & FILTER BAR ================= */}
      <section className="pb-12 -mt-8 bg-transparent relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between bg-white p-5 rounded-2xl shadow-xl border border-slate-200 backdrop-blur-md">
            
            {/* حقل البحث التفاعلي */}
            <div className="relative w-full lg:w-5/12">
              <Search size={18} className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-blue-950/60`} />
              <Input
                type="text"
                placeholder={t('products.search')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={`${language === 'ar' ? 'pr-11 pl-4' : 'pl-11 pr-4'} h-12 bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 rounded-xl font-medium transition-all duration-300`}
              />
            </div>

            {/* أزرار الفلترة المحدثة */}
            <div className="flex gap-2 overflow-x-auto pb-1 w-full lg:w-auto scrollbar-none snap-x">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`rounded-full px-5 h-10 text-sm font-bold whitespace-nowrap transition-all duration-300 border snap-center ${
                    selectedCategory === cat.value 
                      ? 'bg-blue-950 text-white border-blue-950 hover:bg-blue-900 shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-orange-600 hover:text-orange-600'
                  }`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID SECTION ================= */}
      <section className="pb-32 bg-transparent">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-xl mx-auto"
              >
                <div className="w-16 h-16 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                  <Search size={28} />
                </div>
                <p className="text-lg font-bold text-slate-800 mb-1">{language === 'ar' ? 'عذراً، لم نجد نتائج' : 'No matches found'}</p>
                <p className="text-sm text-slate-400 font-medium">{language === 'ar' ? 'تأكد من كتابة الاسم بشكل صحيح أو جرب قسماً آخر' : 'Verify the spelling or try switching categories.'}</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isFav = isFavorite(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 70, damping: 15 }}
                    >
                      <Card className="group h-[540px] overflow-hidden rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-600/40 transition-all duration-500 flex flex-col bg-white">
                        
                        {/* إطار صورة المنتج */}
                        <div className="relative h-[300px] bg-slate-50 flex items-center justify-center overflow-hidden p-6 border-b border-slate-100 transition-colors group-hover:bg-orange-50/30">
                          <img
                            src={product.image}
                            alt={language === 'ar' ? product.ar : product.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* زر التفضيل */}
                          <button
                            type="button"
                            onClick={() => isFav ? removeFavorite(product.id) : addFavorite(product.id)}
                            className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-xs z-10 ${
                              isFav
                                ? 'bg-red-500 border-red-500 text-white shadow-red-200'
                                : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-white'
                            }`}
                          >
                            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        {/* معلومات الكرت */}
                        <CardHeader className="p-5 pb-2">
                          <div className="flex justify-between items-center mb-2.5">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-600/10 px-2.5 py-1 rounded-md">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-orange-600">
                              <Star size={14} fill="currentColor" />
                              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-display font-bold text-xl text-blue-950 group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
                            {language === 'ar' ? product.ar : product.name}
                          </h3>
                        </CardHeader>

                        <CardContent className="px-5 flex-grow">
                          <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-3 font-medium">
                            {language === 'ar' ? product.desc.ar : product.desc.en}
                          </p>
                        </CardContent>

                        {/* أزرار الأكشن السفلية */}
                        <CardFooter className="p-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 bg-slate-50/30">
                          <Button
                            variant="outline"
                            className="font-bold rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-100 hover:text-blue-950 text-xs md:text-sm h-11 transition-all"
                            asChild
                          >
                            <Link href={`/product/${product.id}`}>
                              {t('products.learnMore')}
                            </Link>
                          </Button>

                          {/* زر طلب السعر الكحلي */}
                          <Button
                            className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs md:text-sm h-11 shadow-xs transition-all border-none"
                            asChild
                          >
                            <Link
                              href={`/quotation?product=${encodeURIComponent(
                                language === 'ar' ? product.ar : product.name
                              )}`}
                            >      
                              <ShoppingCart size={15} className={`${language === 'ar' ? 'ml-1.5' : 'mr-1.5'}`} />
                              <span>{language === 'ar' ? 'طلب سعر' : 'Get Quote'}</span>
                            </Link>
                          </Button>
                        </CardFooter>

                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

          {/* ملخص عدد النتائج */}
          <motion.div 
            layout
            className="text-center text-slate-500 mt-16 font-semibold text-sm tracking-wide bg-white border border-slate-200 w-fit mx-auto px-5 py-2.5 rounded-full shadow-2xs"
          >
            {language === 'ar' ? `إجمالي النتائج: ${filteredProducts.length} منتج` : `Showing ${filteredProducts.length} premium products`}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;