import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowUpRight, AlertCircle, CheckCircle2, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { t, language, dir } = useLanguage();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const cleanValue = value.replace(/[^\d]/g, '').slice(0, 11);
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const currentErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      currentErrors.fullName = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      currentErrors.fullName = language === 'ar' ? 'يجب أن يكون الاسم 3 أحرف على الأقل' : 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      currentErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      currentErrors.email = language === 'ar' ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      currentErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (formData.phone.trim().length !== 11) {
      currentErrors.phone = language === 'ar' ? 'يجب أن يتكون رقم الهاتف من 11 رقماً' : 'Phone number must be exactly 11 digits';
    }

    if (!formData.subject.trim()) {
      currentErrors.subject = language === 'ar' ? 'عنوان الرسالة مطلوب' : 'Subject is required';
    }

    if (!formData.message.trim()) {
      currentErrors.message = language === 'ar' ? 'نص الرسالة مطلوب' : 'Message details are required';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedName(formData.fullName.trim());
      setShowSuccessPopup(true);
    }
  };

  const handleCloseAndReset = () => {
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    setShowSuccessPopup(false);
  };

  const handleCloseAndKeepData = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-orange-600 selection:text-white" dir={dir}>
      <Navbar />

      <section className="pt-44 pb-12 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950/90 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-orange-500 font-extrabold tracking-wider uppercase text-xs mb-3 block bg-orange-600/20 px-3 py-1 rounded-full w-fit mx-auto">
              {language === 'ar' ? 'تواصل مع فريقنا' : 'Connect With Our Team'}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight text-white">
              {t('contact.title')}
            </h1>
            <div className="w-16 h-1.5 bg-orange-600 mx-auto mb-5 rounded-full" />
            <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="pb-28 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                
                {/* Clickable Phone Card */}
                <a 
                  href="tel:+201009013000" 
                  className="block group outline-none"
                  title={language === 'ar' ? 'اضغط للاتصال الفوري' : 'Click to call now'}
                >
                  <Card className="border border-slate-200 bg-white shadow-md group-hover:border-orange-600/50 group-hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <CardContent className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-950 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shrink-0">
                          <Phone size={18} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xs text-slate-400 mb-0.5">{t('contact.phone_label')}</h3>
                          <p className="text-blue-950 font-bold text-sm md:text-base tracking-wide group-hover:text-orange-600 transition-colors" dir="ltr">
                            +20 100 901 3000
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-orange-600 transition-all" />
                    </CardContent>
                  </Card>
                </a>

                {/* Clickable Email Card */}
                <a 
                  href="mailto:Wash_matic2@yahoo.com" 
                  className="block group outline-none"
                  title={language === 'ar' ? 'اضغط لإرسال بريد إلكتروني' : 'Click to send email'}
                >
                  <Card className="border border-slate-200 bg-white shadow-md group-hover:border-orange-600/50 group-hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <CardContent className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-950 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-xs text-slate-400 mb-0.5">{t('contact.email_label')}</h3>
                          <p className="text-blue-950 font-bold text-sm truncate select-all group-hover:text-orange-600 transition-colors">
                            Wash_matic2@yahoo.com
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-orange-600 transition-all" />
                    </CardContent>
                  </Card>
                </a>

                {/* Address Card */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <Card className="border border-slate-200 bg-white shadow-md rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-950 shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xs text-slate-400 mb-0.5">{t('contact.address_label')}</h3>
                        <p className="text-blue-950 font-bold text-sm leading-relaxed">
                          {language === 'ar' 
                            ? '٩٢ التقسيم السياحي، القناطر الخيرية، القليوبية، مصر.' 
                            : '92 Tourist Division, Al Qanater Al Khairiya, Qalyubia, Egypt.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex-1 min-h-[200px] rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between relative overflow-hidden shadow-md">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-orange-600/5 rounded-full blur-2xl" />
                <div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-blue-950 flex items-center justify-center mb-3">
                    <Clock size={16} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-blue-950 mb-1">
                    {language === 'ar' ? 'ساعات العمل الرسمية' : 'Official Business Hours'}
                  </h4>
                  <p className="text-slate-500 text-xs font-semibold">
                    {language === 'ar' ? 'الأحد إلى الخميس (9:00 ص - 6:00 م)' : 'Sunday to Thursday (9:00 AM - 6:00 PM)'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-xs">
                    <span className="text-slate-400 block font-medium">{language === 'ar' ? 'العطلة الأسبوعية:' : 'Weekend:'}</span>
                    <span className="font-bold text-red-500">{language === 'ar' ? 'الجمعة والسبت' : 'Friday & Saturday'}</span>
                  </div>
                  
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-950 text-white hover:bg-blue-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
                  >
                    <span>{language === 'ar' ? 'اتجاهات الموقع' : 'Get Directions'}</span>
                    <ArrowUpRight size={14} className="text-orange-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.99 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.4 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 h-full flex flex-col justify-center"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <h2 className="text-lg font-display font-bold text-blue-950">{t('contact.sendMessage')}</h2>
                </div>
                
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">{t('contact.fullName')}</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`h-11 bg-slate-50 border-slate-200 text-slate-800 font-medium rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">{t('contact.email')}</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`h-11 bg-slate-50 border-slate-200 text-slate-800 font-medium rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">{t('contact.phone')}</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01xxxxxxxxx"
                        className={`h-11 bg-slate-50 border-slate-200 text-slate-800 font-medium rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">{t('contact.subject')}</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`h-11 bg-slate-50 border-slate-200 text-slate-800 font-medium rounded-lg transition-all focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 ${errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                          <AlertCircle size={12} /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">{t('contact.message')}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`bg-slate-50 border-slate-200 text-slate-800 font-medium rounded-lg resize-none p-3 transition-all focus-visible:ring-1 focus-visible:ring-orange-600 focus-visible:border-orange-600 ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>
                  
                  {/* زر الإرسال */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-blue-950 text-white hover:bg-blue-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-xs border-none"
                  >
                    {t('contact.send')}
                    <Send size={14} className="text-orange-600" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUCCESS POPUP MODAL ================= */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl p-6 relative text-center z-10 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-orange-600/5 rounded-full blur-xl pointer-events-none" />

              <button 
                onClick={handleCloseAndKeepData}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
                title={language === 'ar' ? 'الرجوع للتعديل' : 'Back to edit'}
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl font-display font-bold text-blue-950 mb-2">
                {language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 px-2 font-medium">
                {language === 'ar' ? (
                  <span>شكراً لك يا <span className="text-orange-600 font-bold">{submittedName}</span>، لقد استلمنا تفاصيل رسالتك بنجاح.</span>
                ) : (
                  <span>Thank you, <span className="text-orange-600 font-bold">{submittedName}</span>. We have received your request successfully.</span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleCloseAndReset}
                  className="bg-blue-950 hover:bg-blue-900 text-white font-bold h-11 rounded-xl text-xs flex-1 order-1 sm:order-2 shadow-sm border-none"
                >
                  {language === 'ar' ? 'حسناً، إرسال جديد' : 'Great, New Message'}
                </Button>

                <Button 
                  onClick={handleCloseAndKeepData}
                  variant="outline"
                  className="border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold h-11 rounded-xl text-xs flex-1 order-2 sm:order-1 gap-1.5 transition-all"
                >
                  <RotateCcw size={13} />
                  {language === 'ar' ? 'مراجعة وتعديل البيانات' : 'Review & Edit Info'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Contact;