import { useRoute, useLocation } from 'wouter';
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
  Eye
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ================= IMAGES =================
import electrical1 from '../images/جهاز_كهربائي_متميز.jpg';
import electrical2 from '../images/وحدة_طاقة_صناعية_كبيرة.png';
import electrical3 from '../images/لوحة_تحكم_ذكية.jpg';

import heater1 from '../images/سخان_مائي_كهربائي.webp';
import heater2 from '../images/سخان_محمول.webp';
import heater3 from '../images/سخان_صناعي.webp';

import iron1 from '../images/مكواة_بخار_برو.jpg';
import iron2 from '../images/مكوارة_رقمية.webp';
import iron3 from '../images/مكواة_قوية_ومتينة.webp';

import car1 from '../images/طقم_محرك.jpg';
import car2 from '../images/بطاريات_السيارة.jpg';
import car3 from '../images/ناقل_حركة_سيارة.jpg';
import car4 from '../images/مجموعة_فلاتر_سيارات.jpg';

import kitchen1 from '../images/طقم_أواني_طهي.webp';
import kitchen2 from '../images/أدوات_مطبخ_برو.jpg';
import kitchen3 from '../images/خلاط_كهربائي.webp';
import kitchen4 from '../images/كاتل_كهربائي.webp';

import washer1 from '../images/غسالة_ذكية.webp';
import washer2 from '../images/غسالة_صغيرة.jpg';
import washer3 from '../images/غسالة_أطباق.webp';

const ProductDetail = () => {
  const { t, language, dir } = useLanguage();
  const [, params] = useRoute('/product/:id');
  const [, setLocation] = useLocation();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const productId = params?.id ? parseInt(params.id) : 1;

  const specLabels: Record<string, { en: string; ar: string }> = {
    Power: { en: 'Power', ar: 'القدرة' },
    Voltage: { en: 'Voltage', ar: 'الجهد الكهربائي' },
    Warranty: { en: 'Warranty', ar: 'الضمان' },
    Capacity: { en: 'Capacity', ar: 'السعة' }
  };

  const allProducts = [
    {
      id: 1,
      name: 'Premium Electrical Appliance',
      ar: 'جهاز كهربائي متميز',
      category: 'electrical',
      image: electrical1,
      rating: 4.8,
      desc: {
        en: 'High efficiency electrical device engineered for high performance and durability.',
        ar: 'جهاز كهربائي عالي الكفاءة، مصمم هندسياً لتقديم أعلى مستويات الأداء والتحمل الشاق.'
      },
      features: {
        en: [
          'Advanced electrical control system',
          'Eco-friendly energy saving technology',
          'Heavy-duty materials for high durability',
          'Smart architecture for easy maintenance'
        ],
        ar: [
          'نظام تحكم كهربائي متطور بالكامل',
          'تقنية ذكية ومبتكرة موفرة للطاقة',
          'مواد تصنيع فائقة الجودة لمتانة تدوم',
          'هندسة داخلية مبسطة لسهولة الصيانة'
        ]
      },
      specs: {
        Power: '2200W',
        Voltage: '220V',
        Warranty: language === 'ar' ? 'سنتين' : '2 Years'
      }
    },
    {
      id: 2,
      name: 'Industrial Power Unit',
      ar: 'وحدة طاقة صناعية متميزة',
      category: 'electrical',
      image: electrical2,
      rating: 4.7,
      desc: {
        en: 'Heavy-duty industrial power system built for ultimate reliability.',
        ar: 'نظام طاقة صناعي متكامل مخصص للأعمال الشاقة ومصمم لضمان استمرارية التشغيل بكفاءة.'
      },
      features: {
        en: ['Premium industrial grade', 'Extended operational life', 'High performance efficiency'],
        ar: ['جودة تصنيع صناعية معتمدة', 'عمر افتراضي ممتد للمواصفات الشاقة', 'كفاءة تشغيلية فائقة تحت الضغط']
      },
      specs: {
        Power: '3500W',
        Voltage: '380V',
        Warranty: language === 'ar' ? '3 سنوات' : '3 Years'
      }
    },
    {
      id: 3,
      name: 'Smart Control Panel',
      ar: 'لوحة تحكم ذكية متطورة',
      category: 'electrical',
      image: electrical3,
      rating: 4.6,
      desc: {
        en: 'Advanced smart control system with a seamless visual interface.',
        ar: 'نظام تحكم ذكي رائد يمنحك مرونة كاملة في الإدارة والمراقبة عبر واجهة مستخدم متطورة.'
      },
      features: {
        en: ['High-precision smart sensors', 'Intuitive easy control', 'Sleek modern design'],
        ar: ['حساسات ذكية وعالية الدقة', 'سهولة تامة في التحكم والإعداد', 'تصميم عصري يواكب أحدث الأنظمة']
      },
      specs: {
        Power: '1800W',
        Voltage: '220V',
        Warranty: language === 'ar' ? 'سنتين' : '2 Years'
      }
    },
    {
      id: 4,
      name: 'Electric Water Heater',
      ar: 'سخان ماء كهربائي سريع',
      category: 'heaters',
      image: heater1,
      rating: 4.6,
      desc: {
        en: 'Fast heating water system designed with multi-layer thermal protection.',
        ar: 'نظام تسخين فوري وآمن للمياه، مدعوم بطبقات عزل حراري مبتكرة للحفاظ على درجة الحرارة.'
      },
      features: {
        en: ['Rapid safe heating', 'Multi-layer safety features', 'Optimized energy efficiency'],
        ar: ['تسخين فوري آمن تماماً', 'منظومة أمان وحماية متعددة المستويات', 'استهلاك اقتصادي ومثالي للطاقة']
      },
      specs: {
        Capacity: language === 'ar' ? '50 لتر' : '50L',
        Power: '2000W',
        Warranty: language === 'ar' ? '5 سنوات' : '5 Years'
      }
    }
  ];

  const product = allProducts.find((p) => p.id === productId) || allProducts[0];
  const isFav = isFavorite(product.id);

  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-950 selection:text-white" dir={dir}>
      <Navbar />

      <section className="pt-36 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              className="mb-8 hover:text-blue-950 hover:bg-slate-100 rounded-xl transition-all font-semibold group text-slate-500"
              onClick={() => setLocation('/products')}
            >
              {dir === 'rtl' ? (
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              )}
              {language === 'ar' ? 'الرجوع للمنتجات' : 'Back to Products'}
            </Button>
          </motion.div>

          {/* TOP SECTION: IMAGE & INFO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            
            {/* IMAGE CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Card className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl bg-white h-[450px] md:h-[540px] flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent pointer-events-none" />
                
                <motion.img
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.image}
                  alt={language === 'ar' ? product.ar : product.name}
                  className="w-full h-full object-contain p-8 md:p-12 transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => isFav ? removeFavorite(product.id) : addFavorite(product.id)}
                  className={`absolute top-6 right-6 p-4 rounded-full shadow-xl backdrop-blur-md transition-colors ${
                    isFav
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={21} fill={isFav ? 'currentColor' : 'none'} />
                </motion.button>
              </Card>
            </motion.div>

            {/* INFO PANEL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-blue-950/10 text-blue-950 border border-blue-950/20 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                  <Star size={16} fill="#020617" className="text-blue-950" />
                  <span className="font-bold text-sm text-slate-700">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-blue-950 leading-tight">
                {language === 'ar' ? product.ar : product.name}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 border-l-4 border-blue-950 rtl:border-l-0 rtl:border-r-4 pl-4 rtl:pl-0 rtl:pr-4 py-1">
                {language === 'ar' ? product.desc.ar : product.desc.en}
              </p>

              {/* ACTION BUTTON */}
              <div className="mb-10">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-blue-950 text-white hover:bg-blue-900 font-bold h-16 px-10 rounded-2xl w-full sm:w-auto shadow-lg shadow-blue-950/20 text-lg flex items-center justify-center gap-3 transition-all border-none"
                    onClick={() =>
                      setLocation(
                        `/quotation?product=${encodeURIComponent(
                          language === 'ar' ? product.ar : product.name
                        )}`
                      )
                    }
                  >
                    <ShoppingCart size={22} />
                    {language === 'ar' ? 'طلب عرض سعر مباشر' : 'Request Direct Quote'}
                  </Button>
                </motion.div>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-8 border-slate-200">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-950/30 transition-colors group">
                  <div className="p-3 rounded-xl bg-slate-50 text-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-colors">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-blue-950">{language === 'ar' ? 'ضمان معتمد وحقيقي' : 'Certified Warranty'}</span>
                    <span className="text-xs text-slate-500">{language === 'ar' ? 'دعم فني متكامل وقطع غيار' : 'Full support & original parts'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-950/30 transition-colors group">
                  <div className="p-3 rounded-xl bg-slate-50 text-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-colors">
                    <Clock size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-blue-950">{language === 'ar' ? 'تسليم وشحن سريع' : 'Fast & Safe Delivery'}</span>
                    <span className="text-xs text-slate-500">{language === 'ar' ? 'جدولة مرنة حسب رغبتك' : 'Flexible scheduling for you'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FEATURES & SPECIFICATIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-28">
            
            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3 text-blue-950">
                <span className="p-2 rounded-xl bg-slate-50 text-blue-950"><Award size={24} /></span>
                {language === 'ar' ? 'المميزات التنافسية' : 'Key Features'}
              </h2>

              <div className="space-y-3">
                {(language === 'ar' ? product.features.ar : product.features.en).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-l-blue-950 rtl:hover:border-r-blue-950 rtl:hover:border-l-transparent border-l-2 rtl:border-r-2 transition-all shadow-sm"
                  >
                    <CheckCircle2 size={18} className="text-blue-950 shrink-0" />
                    <span className="text-sm md:text-base font-medium text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SPECIFICATIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3 text-blue-950">
                <span className="p-2 rounded-xl bg-slate-50 text-blue-950"><CheckCircle2 size={24} /></span>
                {language === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications'}
              </h2>

              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-500">
                      {specLabels[key] ? (language === 'ar' ? specLabels[key].ar : specLabels[key].en) : key}
                    </span>
                    <span className="bg-blue-950/10 text-blue-950 font-bold px-4 py-1.5 rounded-lg text-sm border border-blue-950/20">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* SIMILAR PRODUCTS */}
          <AnimatePresence mode="wait">
            {similarProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-blue-950 z-10 relative inline-block px-4">
                    {language === 'ar' ? 'منتجات ذات صلة قد تهمك' : 'Related Products'}
                  </h2>
                  <div className="w-24 h-1 bg-blue-950 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {similarProducts.map((prod) => (
                    <motion.div
                      key={prod.id}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      <Card className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full justify-between bg-white">
                        <div>
                          <div className="h-[250px] bg-white flex items-center justify-center overflow-hidden relative border-b border-slate-100">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <CardContent className="p-6 pb-2">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-950 transition-colors line-clamp-1 text-blue-950">
                              {language === 'ar' ? prod.ar : prod.name}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                              {language === 'ar' ? prod.desc.ar : prod.desc.en}
                            </p>
                          </CardContent>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 pt-0 mt-4 grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl font-bold border-slate-200 text-blue-950 hover:bg-slate-50 hover:text-blue-950 flex items-center justify-center gap-1.5 transition-all text-xs h-10"
                            onClick={() => setLocation(`/product/${prod.id}`)}
                          >
                            <Eye size={14} />
                            {language === 'ar' ? 'تفاصيل أكثر' : 'View Details'}
                          </Button>

                          <Button
                            size="sm"
                            className="bg-blue-950 text-white hover:bg-blue-900 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs h-10 shadow-md shadow-blue-950/10 border-none"
                            onClick={() =>
                              setLocation(
                                `/quotation?product=${encodeURIComponent(
                                  language === 'ar' ? prod.ar : prod.name
                                )}`
                              )
                            }
                          >
                            <ShoppingCart size={14} />
                            {language === 'ar' ? 'طلب تسعيرة' : 'Get Quote'}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;