import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Our Products',
    'nav.agencies': 'About Us',
    'nav.contact': 'Get in Touch',
    'nav.quotation': 'Request Quote',
    'nav.favorites': 'My Wishlist',
    'nav.slogan': 'Excellence in Industrial Solutions',
    
    'hero.title': 'Washmatec Trading & Import',
    'hero.subtitle': 'Precision Engineering, Trusted Performance',
    'hero.description': 'Your premier partner for integrated industrial equipment and advanced technical solutions since 1998.',
    'hero.cta': 'Discover Range',
    
    'about.title': 'About Washmatec',
    'about.since': 'Decades of Industrial Trust (Since 1998)',
    'about.description': 'Delivering world-class products backed by expert support.',
    'about.mission': 'Corporate Mission',
    'about.mission_text': 'To empower industries by delivering state-of-the-art washing, water treatment, and industrial machinery, committed to global quality standards, sustainable innovation, and client-centric support.',
    'about.mission_short': 'Leading the industrial sector with high-end machinery and unparalleled client service.',
    'about.vision': 'Our Vision',
    'about.vision_text': 'To set new benchmarks in the industrial solutions market and become the gold standard for reliability globally.',
    'about.values': 'Core Values',
    'about.quality': 'Excellence',
    'about.quality_desc': 'We never compromise on safety and international standard specifications.',
    'about.integrity': 'Transparency',
    'about.integrity_desc': 'Building lasting partnerships rooted in honesty and business ethics.',
    'about.service': 'Dedication',
    'about.service_desc': 'Your operations are our priority, with 24/7 post-sales technical support.',
    'about.innovation': 'Adaptability',
    'about.innovation_desc': 'Continuously evolving our product line to match emerging global tech.',
    'about.location': 'Headquarters',
    'about.address': '92 Tourist Division, Al Qanater Al Khairiya, Qalyubia, Egypt',
    
    'products.title': 'Industrial Catalogue',
    'products.search': 'Search machinery or category...',
    'products.filter': 'Filter by Sector',
    'products.all': 'View All Equipment',
    'products.learnMore': 'Technical Specs',
    'products.addFavorite': 'Bookmark Equipment',
    'products.removeFavorite': 'Remove from Wishlist',
    
    'details.features': 'Performance Features',
    'details.specifications': 'Technical Data Sheet',
    'details.similar': 'Recommended Alternatives',
    'details.requestQuote': 'Get Price Sheet',
    
    'quotation.title': 'Request a Quotation',
    'quotation.subtitle': 'Provide your project details below and our sales engineering team will contact you promptly.',
    'quotation.fullName': 'Contact Person Name',
    'quotation.email': 'Business Email',
    'quotation.phone': 'Mobile / WhatsApp Number',
    'quotation.company': 'Organization / Corporate Name',
    'quotation.category': 'Required Equipment Class',
    'quotation.quantity': 'Required Units',
    'quotation.specifications': 'Custom Specifications Required',
    'quotation.message': 'Project Brief / Context',
    'quotation.submit': 'Send Inquiry',
    'quotation.required': 'Required Information',
    'quotation.success': 'Your inquiry has been received. A technical representative will review your request shortly.',
    
    'contact.title': 'Connect With Us',
    'contact.subtitle': 'Have a technical inquiry? Our team is ready to assist.',
    'contact.sendMessage': 'Drop Us a Message',
    'contact.fullName': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.subject': 'Inquiry Subject',
    'contact.message': 'How can we help you?',
    'contact.send': 'Submit Message',
    'contact.info': 'Washmatec Corporate Office',
    'contact.phone_label': 'Hotline / Tel',
    'contact.email_label': 'Inquiries Email: Wash_matic2@yahoo.com',
    'contact.address_label': 'Location Map',
    'contact.company_label': 'Washmatec Trading & Import',
    
    'agencies.title': 'International Alliances',
    'agencies.subtitle': 'Exclusive global brands and authorized partnerships',
    'agencies.brands': 'Brands We Proudly Represent',
    
    'favorites.title': 'Saved Equipment',
    'favorites.empty': 'Your saved list is currently empty.',
    'favorites.remove': 'Delete',
    'favorites.requestQuote': 'Bulk Quotation Request',
    'favorites.count': 'Saved Items',
    'favorites.clear': 'Reset List',
    
    'footer.quickLinks': 'Navigation Hub',
    'footer.company': 'About Washmatec',
    'footer.followUs': 'Stay Connected',
    'footer.copyright': '© 1998-2026 Washmatec Trading & Import. All rights reserved.',
    'footer.privacy': 'Privacy & Compliance',
    'footer.terms': 'Terms of Use',    
    'common.loading': 'Processing...',
    'common.error': 'System error, try again',
    'common.success': 'Operation Successful',
    'common.back': 'Previous Step',
    'common.next': 'Next Step',
    'common.previous': 'Back',
    'common.close': 'Dismiss',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.products': 'كتالوج المنتجات',
    'nav.agencies': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.quotation': 'طلب تسعير',
    'nav.favorites': 'قائمتي المفضلة',
    'nav.slogan': 'تميز في الحلول الصناعية',
    
    'hero.title': 'شركة وش ماتيك للتجارة والاستيراد',
    'hero.subtitle': 'تقنيات صناعية متطورة، وأداء يعتمد عليه',
    'hero.description': 'شريككم الموثوق في توريد المعدات الصناعية المتكاملة والحلول الفنية المبتكرة منذ عام 1998.',
    'hero.cta': 'تصفح المعدات',
    
    'about.title': 'نبذة عن وش ماتيك',
    'about.since': 'عقود من الخبرة (منذ 1998)',
    'about.description': 'نقدم معدات بمواصفات عالمية مدعومة بخبرات فنية متخصصة.',
    'about.mission': 'رسالتنا',
    'about.mission_text': 'الارتقاء بالقطاع الصناعي عبر توفير أحدث معدات الغسيل، أنظمة معالجة المياه، وخطوط الإنتاج، مع الالتزام التام بأعلى معايير الجودة العالمية، والابتكار المستمر في خدمة عملائنا.',
    'about.mission_short': 'رواد في توريد المعدات الصناعية مع تقديم دعم فني احترافي لا يضاهى.',
    'about.vision': 'رؤيتنا',
    'about.vision_text': 'أن نكون الخيار الأول والأكثر موثوقية للحلول الصناعية المتكاملة في المنطقة.',
    'about.values': 'قيمنا',
    'about.quality': 'جودة استثنائية',
    'about.quality_desc': 'نحرص على مطابقة كافة معداتنا للمواصفات الفنية ومعايير السلامة الدولية.',
    'about.integrity': 'الشفافية المهنية',
    'about.integrity_desc': 'نعتز ببناء علاقات عمل طويلة الأمد قائمة على الأمانة والمصداقية.',
    'about.service': 'خدمة متميزة',
    'about.service_desc': 'نجاح أعمالكم هو هدفنا، ونلتزم بتقديم دعم فني ممتد لما بعد البيع.',
    'about.innovation': 'تطوير مستمر',
    'about.innovation_desc': 'نواكب أحدث التقنيات العالمية لضمان أعلى كفاءة لخطوط إنتاجكم.',
    'about.location': 'المقر الرئيسي',
    'about.address': '٩٢ التقسيم السياحي، القناطر الخيرية، القليوبية، مصر',
    
    'products.title': 'الخطوط والمعدات الصناعية',
    'products.search': 'ابحث عن معدة...',
    'products.filter': 'تصنيف حسب القطاع',
    'products.all': 'عرض كافة المعدات',
    'products.learnMore': 'المواصفات الفنية',
    'products.addFavorite': 'حفظ في المفضلة',
    'products.removeFavorite': 'إزالة من المفضلة',
    
    'details.features': 'خصائص الأداء',
    'details.specifications': 'جدول البيانات الفنية',
    'details.similar': 'بدائل ومعدات مقترحة',
    'details.requestQuote': 'طلب تسعير المعدة',
    
    'quotation.title': 'طلب مقايسة وعرض سعر',
    'quotation.subtitle': 'يرجى تزويدنا بتفاصيل مشروعك، وسيقوم مهندسو المبيعات الفنية بالتواصل معكم.',
    'quotation.fullName': 'اسم المسؤول عن التواصل',
    'quotation.email': 'البريد الإلكتروني للعمل',
    'quotation.phone': 'رقم الهاتف / الواتساب',
    'quotation.company': 'اسم الشركة / المنشأة',
    'quotation.category': 'فئة المعدات المطلوبة',
    'quotation.quantity': 'العدد المطلوب',
    'quotation.specifications': 'المواصفات الخاصة',
    'quotation.message': 'تفاصيل إضافية',
    'quotation.submit': 'إرسال طلب التسعير',
    'quotation.required': 'معلومة إلزامية',
    'quotation.success': 'تم استلام طلبكم بنجاح. سيقوم ممثل فني بالتواصل معكم قريباً.',
    
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'لديك استفسار فني أو تجاري؟ فريقنا مستعد للإجابة.',
    'contact.sendMessage': 'راسلنا مباشرة',
    'contact.fullName': 'الاسم بالكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.subject': 'عنوان الاستفسار',
    'contact.message': 'كيف يمكننا مساعدتك؟',
    'contact.send': 'إرسال الرسالة',
    'contact.info': 'مكاتب شركة وش ماتيك',
    'contact.phone_label': 'الخط الساخن',
    'contact.email_label': 'بريد الاستفسارات: Wash_matic2@yahoo.com',
    'contact.address_label': 'الموقع',
    'contact.company_label': 'شركة وش ماتيك للتجارة والاستيراد',
    
    'agencies.title': 'الوكالات العالمية',
    'agencies.subtitle': 'شركاء النجاح والعلامات التجارية',
    'agencies.brands': 'علامات تجارية نفخر بتمثيلها',
    
    'favorites.title': 'المعدات المحفوظة',
    'favorites.empty': 'قائمتك فارغة حالياً.',
    'favorites.remove': 'حذف',
    'favorites.requestQuote': 'طلب تسعير شامل',
    'favorites.count': 'المعدات المحفوظة',
    'favorites.clear': 'تفريغ',
    
    'footer.quickLinks': 'روابط سريعة',
    'footer.company': 'حول وش ماتيك',
    'footer.followUs': 'منصاتنا الرقمية',
    'footer.copyright': '© ١٩٩٨-٢٠٢٦ شركة وش ماتيك للتجارة والاستيراد. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ، حاول مجدداً',
    'common.success': 'تمت العملية بنجاح',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}