import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Award, HeartHandshake, Lightbulb, Calendar, MapPin, Building2, Sparkles, ArrowUpRight } from 'lucide-react';

const Agencies = () => {
  const { t, language, dir } = useLanguage();

  // مصفوفة القيم الأربعة بعد تحويل الهوية البصرية إلى درجات البرتقالي والأزرق الداكن
  const values = [
    {
      id: 1,
      title: language === 'ar' ? 'الجودة' : 'Quality',
      desc: language === 'ar' ? 'نضمن أن جميع المنتجات تلبي المعايير الدولية وتخضع لأعلى مستويات الفحص.' : 'We ensure all products meet international standards and undergo rigorous testing.',
      icon: <Award className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
    },
    {
      id: 2,
      title: language === 'ar' ? 'النزاهة' : 'Integrity',
      desc: language === 'ar' ? 'نتعامل بصدق وشفافية مطلقة في كل شراكة ومع كل عميل لبناء ثقة مستدامة.' : 'We operate with absolute honesty and transparency to build long-term trust.',
      icon: <ShieldCheck className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
    },
    {
      id: 3,
      title: language === 'ar' ? 'الخدمة' : 'Service',
      desc: language === 'ar' ? 'نعطي الأولوية القصوى لرضا العملاء وتقديم دعم فني وتقني متكامل على مدار الساعة.' : 'We prioritize customer satisfaction and provide comprehensive support around the clock.',
      icon: <HeartHandshake className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
    },
    {
      id: 4,
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      desc: language === 'ar' ? 'نحسن باستمرار عملياتنا ونعتمد على أحدث التقنيات لتقديم حلول سريعة وذكية.' : 'We continuously improve our processes and adopt the latest technologies for smart solutions.',
      icon: <Lightbulb className="w-10 h-10 text-orange-600" strokeWidth={1.5} />
    }
  ];

  // تأثيرات الحركية المتسلسلة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-orange-600 selection:text-white" dir={dir}>
      <Navbar />

      {/* ================= 1. SECTION HERO: عن شركة واش ماتيك ================= */}
      <section className="pt-44 pb-20 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950/90">
        {/* الخلفية الهندسية الموحدة المبهجة والمريحة للعين */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* بادج علوي مبهج ومودرن برتقالي ناعم */}
            <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-500 px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide shadow-xs">
              <Building2 size={16} />
              <span>{language === 'ar' ? 'ملف الشركة التعريفي' : 'Company Profile'}</span>
            </div>

            {/* اسم الشركة وعنوانها الرئيسي المنسق بالبرتقالي والأزرق الداكن */}
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight text-white">
              {language === 'ar' ? (
                <>شركة <span className="text-orange-600 relative">واش ماتيك<span className="absolute -bottom-2 left-0 w-full h-1.5 bg-orange-600/20 rounded-full"></span></span></>
              ) : (
                <>Wash <span className="text-orange-600">Matic</span></>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-blue-100 max-w-xl mx-auto mb-6 font-display">
              {language === 'ar' ? 'منتجات موثوقة، خدمة احترافية' : 'Trusted Products, Professional Service'}
            </p>

            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto mb-8 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ================= 2. SECTION VALUES: قيمنا الأساسية ================= */}
      <section className="py-20 bg-white border-y border-slate-200 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-blue-950 mb-3">
              {language === 'ar' ? 'قيمنا الراسخة' : 'Our Core Values'}
            </h2>
            <div className={`w-12 h-1 bg-orange-600 rounded-full mx-auto mb-3`} />
            <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base font-medium">
              {language === 'ar' ? 'المبادئ الأساسية التي تقود مسيرتنا نحو التميز يومياً' : 'The core pillars driving our journey toward excellence every day'}
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map(val => (
              <motion.div key={val.id} variants={itemVariants}>
                <Card className="h-full border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-600/30 transition-all duration-500 group overflow-hidden bg-white rounded-3xl relative">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    {/* خط برتقالي تفاعلي يظهر بجمالية عند الـ Hover */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* حاوية الأيقونة */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:scale-110 group-hover:bg-orange-600/10 transition-all duration-500 shadow-inner text-orange-600">
                      {val.icon}
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-3 text-blue-950 group-hover:text-orange-600 transition-colors">
                      {val.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 leading-relaxed text-center font-medium">
                      {val.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 3. SECTION COMPANY INFO: معلومات الشركة اللوجستية ================= */}
      <section className="py-24 relative bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-black text-blue-950 mb-3">
              {language === 'ar' ? 'معلومات الشركة' : 'Company Information'}
            </h2>
            <div className="w-12 h-1.5 bg-orange-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* كارد تاريخ التأسيس */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="h-full bg-white border border-slate-200 rounded-3xl p-10 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-orange-600/5 pointer-events-none">
                  <Sparkles size={120} strokeWidth={1} />
                </div>
                
                <div className="w-14 h-14 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600 mb-6 shadow-xs">
                  <Calendar size={28} />
                </div>
                
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                  {language === 'ar' ? 'تأسست عام' : 'Established In'}
                </p>
                
                <h3 className="text-6xl font-display font-black text-blue-950 tracking-tight group-hover:scale-105 group-hover:text-orange-600 transition-all duration-500">
                  1998
                </h3>
                
                <p className="text-xs text-slate-500 font-medium mt-4 max-w-[220px] leading-relaxed">
                  {language === 'ar' ? 'أكثر من عقدين من التميز والعطاء المستمر في السوق' : 'Over two decades of trusted market leadership and excellence'}
                </p>
              </div>
            </motion.div>

            {/* كارد الموقع الجغرافي */}
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="h-full bg-blue-950 border border-blue-900 text-white rounded-3xl p-10 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                {/* تأثير الإضاءة الخلفية */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-orange-600/10 rounded-full opacity-40 blur-xl pointer-events-none" />
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 shadow-sm mt-1 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                    <MapPin size={28} />
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-600/10 px-3 py-1 rounded-full inline-block mb-3">
                      {language === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                    </span>
                    <h4 className="text-2xl font-display font-bold text-white mb-4">
                      {language === 'ar' ? 'موقعنا الجغرافي' : 'Our Location'}
                    </h4>
                    <p className="text-base md:text-lg text-blue-100 leading-relaxed font-medium">
                      {language === 'ar' 
                        ? '٩٢ التقسيم السياحي، القناطر الخيرية، القليوبية، مصر.' 
                        : '92 Tourist Division, Al Qanater Al Khairiya, Qalyubia, Egypt.'}
                    </p>
                    <p className="text-sm text-blue-300 mt-4 font-medium">
                      Wash_matic2@yahoo.com
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-900/50 flex items-center justify-between text-xs text-blue-300">
                  <span className="flex items-center gap-1">📍 {language === 'ar' ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt'}</span>
                  <span className="text-orange-500 group-hover:text-orange-400 font-bold transition-colors cursor-default flex items-center gap-1">
                    {language === 'ar' ? 'تشرفنا بزيارتكم' : 'Welcome to visit us'}
                    <ArrowUpRight size={14} className="inline" />
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agencies;