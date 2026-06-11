import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Zap, Award, Shield, Target, ChevronRight, Activity, Users, Layers, Star, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import logo from '../images/logo.png';
import electrical from '../images/الأجهزة_الكهربائية.png';
import heaters from '../images/السخانات_الكهربائية.jpg';
import irons from '../images/المكاوي_الكهربائية.webp';
import carparts from '../images/قطع_غيار_السيارات.jpg';
import kitchen from '../images/أدوات_المطبخ.png';
import washers from '../images/الغسلات.png';

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
}

// عداد أرقام سلس واحترافي
const AnimatedCounter: React.FC<CounterProps> = ({ from, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState<number>(from);

  useEffect(() => {
    const animation = animate(count, to, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [to, count, rounded, duration]);

  return <>{displayValue}</>;
};

const Home: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 101,
      name: 'Electrical Appliances',
      ar: 'الأجهزة الكهربائية',
      image: electrical,
      desc: { en: 'Premium electrical devices engineered for durability', ar: 'أجهزة كهربائية متطورة مصممة لأقصى درجات التحمل والكفاءة العالية.' },
      category: 'electrical'
    },
    {
      id: 102,
      name: 'Electric Heaters',
      ar: 'السخانات الكهربائية',
      image: heaters,
      desc: { en: 'High-capacity heavy-duty heating systems', ar: 'أنظمة تسخين متطورة توفر أداءً مستقراً للمنشآت الصناعية والمنزلية.' },
      category: 'heaters'
    },
    {
      id: 103,
      name: 'Professional Irons',
      ar: 'المكاوي الاحترافية',
      image: irons,
      desc: { en: 'Industrial-grade professional steaming setups', ar: 'حلول كوي بخارية احترافية مصممة للاستخدام المكثف والشاق.' },
      category: 'irons'
    },
    {
      id: 104,
      name: 'Car Spare Parts',
      ar: 'قطع غيار السيارات',
      image: carparts,
      desc: { en: 'Certified genuine OEM automotive components', ar: 'قطع غيار أصلية معتمدة تضمن أداءً مثالياً وعمراً طويلاً لسيارتك.' },
      category: 'carparts'
    },
    {
      id: 105,
      name: 'Kitchen Tools',
      ar: 'أدوات المطبخ',
      image: kitchen,
      desc: { en: 'Essential professional culinary hardware', ar: 'معدات طهي احترافية تجمع بين التصميم العصري والعملية الفائقة.' },
      category: 'kitchen'
    },
    {
      id: 106,
      name: 'Washing Machines',
      ar: 'الغسالات',
      image: washers,
      desc: { en: 'Next-gen smart industrial washing units', ar: 'تقنيات غسيل ذكية من الجيل الجديد توفر استهلاك الطاقة والمياه.' },
      category: 'washers'
    },
  ]; 

  const values = [
    { icon: <Shield className="text-blue-950 w-7 h-7" />, title: t('about.quality'), desc: t('about.quality_desc') },
    { icon: <Target className="text-blue-950 w-7 h-7" />, title: t('about.integrity'), desc: t('about.integrity_desc') },
    { icon: <Award className="text-blue-950 w-7 h-7" />, title: t('about.service'), desc: t('about.service_desc') },
    { icon: <Zap className="text-blue-950 w-7 h-7" />, title: t('about.innovation'), desc: t('about.innovation_desc') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-950 selection:text-white" dir={dir}>
      {/* FIXED NAVBAR WITH BLUR EFFECT */}
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-0' : 'bg-transparent py-2'}`}>
        <Navbar />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f0f9ff,transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-950/10 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={dir === 'rtl' ? 'text-right' : 'text-left'}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-100 mb-8 text-blue-950 text-sm font-black shadow-sm"
              >
                <Star size={16} className="fill-blue-950 text-blue-950 animate-pulse" />
                <span>{t('nav.slogan')}</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-blue-950 leading-[1.1]">
                {t('hero.title').split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-blue-800" : ""}>{word} </span>
                ))}
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl leading-relaxed font-medium">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Button 
                  size="lg" 
                  className="h-16 px-10 bg-blue-950 text-white font-black text-lg hover:bg-blue-900 hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-300 group rounded-2xl border-none"
                  onClick={() => setLocation('/products')}
                >
                  {t('hero.cta')} 
                  <ArrowRight size={22} className={`ms-2 transition-transform duration-300 ${language === 'ar' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-16 px-10 border-2 border-slate-100 bg-white text-blue-950 font-black text-lg hover:bg-slate-50 hover:border-blue-950/20 transition-all duration-300 rounded-2xl"
                  onClick={() => setLocation('/quotation')}
                >
                  {t('nav.quotation')}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-12 border-t border-slate-100 flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-2 text-slate-500 font-bold">
                  <CheckCircle2 size={20} className="text-blue-950" />
                  <span>{language === 'ar' ? 'ضمان معتمد' : 'Certified Warranty'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold">
                  <CheckCircle2 size={20} className="text-blue-950" />
                  <span>{language === 'ar' ? 'دعم فني 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image / Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent rounded-[3rem] -rotate-6 scale-105" />
              <div className="relative bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden p-8 aspect-square flex items-center justify-center group">
                <img 
                  src={logo} 
                  alt="Bakr Logo" 
                  className="w-3/4 h-3/4 object-contain transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-12 -right-6 bg-white shadow-xl border border-slate-50 p-4 rounded-2xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-950">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{language === 'ar' ? 'الجودة' : 'Quality'}</p>
                    <p className="text-sm font-black text-blue-950">{language === 'ar' ? 'معايير عالمية' : 'Global Standards'}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-12 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2">+<AnimatedCounter from={0} to={11} /></div>
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-widest">{t('about.since')}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2">+<AnimatedCounter from={0} to={500} /></div>
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-widest">{language === 'ar' ? 'منتج متميز' : 'Products'}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2">+<AnimatedCounter from={0} to={1000} /></div>
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-widest">{language === 'ar' ? 'عميل يثق بنا' : 'Happy Clients'}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2">+<AnimatedCounter from={0} to={24} /></div>
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-widest">{language === 'ar' ? 'ساعة دعم' : 'Hours Support'}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-24 md:py-32 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-blue-950 mb-4">
                {t('products.title')}
              </h2>
              <p className="text-slate-500 max-w-xl text-lg font-medium">
                {language === 'ar' ? 'نقدم مجموعة واسعة من المنتجات المصممة لتلبية احتياجاتك بأعلى جودة.' : 'Explore our diverse range of high-performance industrial solutions.'}
              </p>
            </div>
            <Button 
              variant="outline"
              className="h-14 px-8 border-2 border-blue-950/10 text-blue-950 font-black rounded-2xl hover:bg-blue-950 hover:text-white transition-all"
              onClick={() => setLocation('/products')}
            >
              {language === 'ar' ? 'عرض الكتالوج الكامل' : 'View Full Catalogue'}
            </Button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Card className="h-full bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-950/10 transition-all duration-500 overflow-hidden rounded-[2rem] flex flex-col">
                  <div className="relative h-72 bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={product.image}
                      alt={language === 'ar' ? product.ar : product.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <Button 
                        className="bg-white text-blue-950 hover:bg-blue-50 font-black px-8 py-6 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all"
                        onClick={() => setLocation(`/products?category=${product.category}`)}
                      >
                        {t('products.learnMore')}
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <h3 className="font-black text-2xl text-blue-950 group-hover:text-blue-800 transition-colors">
                      {language === 'ar' ? product.ar : product.name}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="px-8 flex-grow">
                    <p className="text-slate-500 text-base leading-relaxed font-medium line-clamp-2">
                      {language === 'ar' ? product.desc.ar : product.desc.en}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="p-8 pt-0 mt-4">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-blue-950 font-black flex items-center gap-2 group/btn no-underline hover:no-underline"
                      onClick={() => setLocation(`/products?category=${product.category}`)}
                    >
                      <span>{t('products.learnMore')}</span>
                      <ChevronRight size={18} className={`transition-transform duration-300 ${language === 'ar' ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="py-24 md:py-32 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-blue-950 mb-8 leading-tight">
                {t('about.title')}
              </h2>
              <p className="text-slate-600 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-950/20 hover:bg-white hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h4 className="font-black text-xl text-blue-950 mb-3">{value.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-50 rounded-[3rem] -rotate-3" />
              <Card className="relative bg-blue-950 text-white p-10 md:p-16 rounded-[3rem] border-none shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-1 bg-white rounded-full" />
                    <span className="font-black uppercase tracking-[0.3em] text-sm text-blue-200">{language === 'ar' ? 'رؤيتنا' : 'Our Vision'}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight">{t('about.vision_text')}</h3>
                  <Button 
                    className="bg-white text-blue-950 hover:bg-blue-50 font-black h-14 px-8 rounded-2xl"
                    onClick={() => setLocation('/about')}
                  >
                    {language === 'ar' ? 'اكتشف المزيد عنا' : 'Learn More About Us'}
                  </Button>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;