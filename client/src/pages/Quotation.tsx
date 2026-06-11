import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FileText, Send, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  quantity: string;
  specifications: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  specifications?: string;
  message?: string;
}

const Quotation: React.FC = () => {
  const { t, language, dir } = useLanguage();

  const getInitialProduct = (): string => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('product') || '';
    }
    return '';
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    category: getInitialProduct(),
    quantity: '',
    specifications: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>('');

  const products = [
    { value: 'Premium Electrical Appliance', label: language === 'ar' ? 'جهاز كهربائي متميز' : 'Premium Electrical Appliance' },
    { value: 'Industrial Power Unit', label: language === 'ar' ? 'وحدة طاقة صناعية' : 'Industrial Power Unit' },
    { value: 'Smart Control Panel', label: language === 'ar' ? 'لوحة تحكم ذكية' : 'Smart Control Panel' },
    { value: 'Electric Water Heater', label: language === 'ar' ? 'سخان ماء كهربائي' : 'Electric Water Heater' },
    { value: 'Portable Heater', label: language === 'ar' ? 'سخان محمول' : 'Portable Heater' },
    { value: 'Industrial Heater', label: language === 'ar' ? 'سخان صناعي' : 'Industrial Heater' },
    { value: 'Steam Iron Pro', label: language === 'ar' ? 'مكواة بخار برو' : 'Steam Iron Pro' },
    { value: 'Digital Iron', label: language === 'ar' ? 'مكواة رقمية' : 'Digital Iron' },
    { value: 'Heavy Duty Iron', label: language === 'ar' ? 'مكواة قوية' : 'Heavy Duty Iron' },
    { value: 'Engine Kit', label: language === 'ar' ? 'طقم محرك' : 'Engine Kit' },
    { value: 'Car Battery', label: language === 'ar' ? 'بطارية سيارة' : 'Car Battery' },
    { value: 'Transmission System', label: language === 'ar' ? 'ناقل الحركة' : 'Transmission System' },
    { value: 'Car Filters Set', label: language === 'ar' ? 'مجموعة فلاتر سيارات' : 'Car Filters Set' },
    { value: 'Cookware Set', label: language === 'ar' ? 'طقم أواني طهي' : 'Cookware Set' },
    { value: 'Kitchen Tools Pro', label: language === 'ar' ? 'أدوات مطبخ برو' : 'Kitchen Tools Pro' },
    { value: 'Blender Set', label: language === 'ar' ? 'خلاط كهربائي' : 'Blender Set' },
    { value: 'Electric Kettle', label: language === 'ar' ? 'كاتل كهربائي' : 'Electric Kettle' },
    { value: 'Smart Washer', label: language === 'ar' ? 'غسالة ذكية' : 'Smart Washer' },
    { value: 'Mini Washer', label: language === 'ar' ? 'غسالة صغيرة' : 'Mini Washer' },
    { value: 'Dishwasher', label: language === 'ar' ? 'غسالة أطباق' : 'Dishwasher' },
  ];

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

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
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

    if (!formData.quantity.trim()) {
      currentErrors.quantity = language === 'ar' ? 'يرجى تحديد الكمية المطلوبة' : 'Please specify the quantity';
    } else if (Number(formData.quantity) <= 0) {
      currentErrors.quantity = language === 'ar' ? 'يجب أن تكون الكمية 1 أو أكثر' : 'Quantity must be 1 or more';
    }

    if (!formData.specifications.trim()) {
      currentErrors.specifications = language === 'ar' ? 'يرجى كتابة المواصفات المطلوبة' : 'Please provide the required specifications';
    } else if (formData.specifications.trim().length < 10) {
      currentErrors.specifications = language === 'ar' ? 'يرجى توضيح المواصفات بشكل أكثر تفصيلاً (10 أحرف على الأقل)' : 'Please describe specifications in more detail (min 10 chars)';
    }

    if (!formData.message.trim()) {
      currentErrors.message = language === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    } else if (formData.message.trim().length < 15) {
      currentErrors.message = language === 'ar' ? 'يجب أن تحتوي الرسالة على 15 حرفاً على الأقل' : 'Message must be at least 15 characters';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Quotation form submitted:', formData);
      setSubmittedName(formData.fullName.trim());
      setShowSuccessPopup(true);
    }
  };

  const handleCloseAndReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      quantity: '',
      specifications: '',
      message: '',
    });
    setErrors({});
    setShowSuccessPopup(false);
  };

  const handleCloseAndKeepData = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/30 to-blue-100/20 relative overflow-x-hidden" dir={dir}>
      <Navbar />

      <section className="pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4 tracking-tight text-blue-950">
                {language === 'ar' ? 'اطلب عرض سعر مخصص' : t('quotation.title')}
              </h1>
              <div className="w-24 h-1.5 bg-blue-950 mx-auto mb-6 rounded-full shadow-sm"></div>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                {language === 'ar' 
                  ? 'نحن هنا لخدمتك. زودنا بالتفاصيل وسيقوم فريقنا الفني بإعداد أفضل عرض مخصص لاحتياجاتك.' 
                  : t('quotation.subtitle')}
              </p>
            </motion.div>

            {/* MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border border-blue-100 shadow-2xl overflow-hidden rounded-[2.5rem] bg-white">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6 md:p-10 text-white flex flex-col sm:flex-row items-center gap-5 md:gap-6 border-b border-blue-200/10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-lg backdrop-blur-sm">
                    <FileText size={32} />
                  </div>
                  <div className="text-center sm:text-start">
                    <h2 className="text-xl md:text-3xl font-display font-black tracking-wide">
                      {language === 'ar' ? 'تفاصيل طلب التسعير' : 'Request Details'}
                    </h2>
                    <p className="text-blue-100/80 text-sm md:text-base mt-2 max-w-xl font-medium">
                      {language === 'ar'
                        ? 'يرجى تعبئة النموذج بدقة لضمان تقديم عرض سعر احترافي وسريع.'
                        : 'Please fill the form accurately to ensure a professional and fast quote.'}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 md:p-12 bg-white">
                  <form onSubmit={handleSubmit} noValidate className="space-y-6 md:space-y-8">
                    
                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {t('quotation.fullName')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                          className={`h-12 md:h-14 bg-slate-50 rounded-2xl transition-all duration-300 border-2 focus-visible:ring-0 ${
                            errors.fullName 
                              ? 'border-red-200 focus-visible:border-red-500' 
                              : 'border-slate-100 focus-visible:border-blue-950'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                            <AlertCircle size={14} /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {t('quotation.email')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@mail.com"
                          className={`h-12 md:h-14 bg-slate-50 rounded-2xl transition-all duration-300 border-2 focus-visible:ring-0 ${
                            errors.email 
                              ? 'border-red-200 focus-visible:border-red-500' 
                              : 'border-slate-100 focus-visible:border-blue-950'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                            <AlertCircle size={14} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* PHONE + COMPANY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {t('quotation.phone')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="01xxxxxxxxx"
                          className={`h-12 md:h-14 bg-slate-50 rounded-2xl transition-all duration-300 border-2 focus-visible:ring-0 ${
                            errors.phone 
                              ? 'border-red-200 focus-visible:border-red-500' 
                              : 'border-slate-100 focus-visible:border-blue-950'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                            <AlertCircle size={14} /> {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {t('quotation.company')} <span className="text-xs text-slate-400 font-medium">({language === 'ar' ? 'اختياري' : 'Optional'})</span>
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={language === 'ar' ? 'اسم المؤسسة أو الشركة' : 'Company name'}
                          className="h-12 md:h-14 bg-slate-50 border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-blue-950 rounded-2xl transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* PRODUCT + QUANTITY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {language === 'ar' ? 'المنتج المطلوب' : 'Requested Product'}
                        </label>
                        <Select onValueChange={handleSelectChange} value={formData.category}>
                          <SelectTrigger className="h-12 md:h-14 bg-slate-50 border-2 border-slate-100 focus:ring-0 focus:border-blue-950 rounded-2xl text-start transition-all duration-300 font-medium">
                            <SelectValue
                              placeholder={language === 'ar' ? 'اختر المنتج من القائمة' : 'Select Product'}
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-100 max-h-[280px] rounded-2xl shadow-2xl">
                            {products.map((product) => (
                              <SelectItem key={product.value} value={product.value} className="focus:bg-blue-50 focus:text-blue-950 font-medium py-3 cursor-pointer">
                                {product.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2.5">
                        <label className="text-sm font-bold text-blue-950 px-1">
                          {t('quotation.quantity')} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="1"
                          className={`h-12 md:h-14 bg-slate-50 rounded-2xl transition-all duration-300 border-2 focus-visible:ring-0 ${
                            errors.quantity 
                              ? 'border-red-200 focus-visible:border-red-500' 
                              : 'border-slate-100 focus-visible:border-blue-950'
                          }`}
                        />
                        {errors.quantity && (
                          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                            <AlertCircle size={14} /> {errors.quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* SPECS */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-blue-950 px-1">
                        {t('quotation.specifications')} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        name="specifications"
                        value={formData.specifications}
                        onChange={handleChange}
                        rows={3}
                        placeholder={language === 'ar' ? 'اكتب المواصفات الفنية المطلوبة بدقة...' : 'Describe technical specifications...'}
                        className={`bg-slate-50 rounded-2xl resize-none p-4 transition-all duration-300 border-2 focus-visible:ring-0 ${
                          errors.specifications 
                            ? 'border-red-200 focus-visible:border-red-500' 
                            : 'border-slate-100 focus-visible:border-blue-950'
                        }`}
                      />
                      {errors.specifications && (
                        <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                          <AlertCircle size={14} /> {errors.specifications}
                        </p>
                      )}
                    </div>

                    {/* MESSAGE */}
                    <div className="space-y-2.5">
                      <label className="text-sm font-bold text-blue-950 px-1">
                        {t('quotation.message')} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={language === 'ar' ? 'هل لديك أي ملاحظات إضافية؟' : 'Any additional notes?'}
                        className={`bg-slate-50 rounded-2xl resize-none p-4 transition-all duration-300 border-2 focus-visible:ring-0 ${
                          errors.message 
                            ? 'border-red-200 focus-visible:border-red-500' 
                            : 'border-slate-100 focus-visible:border-blue-950'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1.5 font-bold px-1 animate-fade-in">
                          <AlertCircle size={14} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                      type="submit"
                      className="w-full h-16 bg-blue-950 text-white hover:bg-blue-900 font-black text-xl rounded-2xl shadow-xl shadow-blue-950/20 transition-all duration-300 group flex items-center justify-center gap-3"
                    >
                      {language === 'ar' ? 'إرسال طلب التسعير الآن' : t('quotation.submit')}
                      <Send
                        size={22}
                        className={`transition-transform duration-300 group-hover:${
                          language === 'ar' ? '-translate-x-1 rotate-12' : 'translate-x-1 -rotate-12'
                        }`}
                      />
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
              onClick={handleCloseAndKeepData}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] border border-blue-100 shadow-2xl p-8 md:p-12 relative text-center z-10 overflow-hidden"
            >
              <button
                onClick={handleCloseAndKeepData}
                className="absolute top-6 right-6 text-slate-400 hover:text-blue-950 transition-colors p-2 rounded-2xl hover:bg-slate-50"
              >
                <X size={20} />
              </button>

              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
                <CheckCircle2 size={44} className="animate-bounce" />
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-blue-950 mb-4">
                {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent Successfully!'}
              </h3>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 px-2 font-medium">
                {language === 'ar' ? (
                  <span>شكراً لك يا <span className="text-blue-950 font-black">{submittedName}</span>. لقد استلمنا طلبك وسيقوم فريقنا الفني بالتواصل معك بعرض سعر مخصص في أقرب وقت ممكن.</span>
                ) : (
                  <span>Thank you, <span className="text-blue-950 font-black">{submittedName}</span>. We have received your request and our technical team will contact you with a tailored quote shortly.</span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCloseAndReset}
                  className="bg-blue-950 hover:bg-blue-900 text-white font-black h-14 rounded-2xl text-base flex-1 order-1 sm:order-2 shadow-lg shadow-blue-950/10 transition-all"
                >
                  {language === 'ar' ? 'طلب عرض سعر جديد' : 'New Request'}
                </Button>

                <Button
                  onClick={handleCloseAndKeepData}
                  variant="outline"
                  className="border-2 border-slate-100 text-blue-950 hover:bg-slate-50 font-bold h-14 rounded-2xl text-base flex-1 order-2 sm:order-1 gap-2 transition-all"
                >
                  <RotateCcw size={18} />
                  {language === 'ar' ? 'مراجعة البيانات' : 'Review Data'}
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

export default Quotation;