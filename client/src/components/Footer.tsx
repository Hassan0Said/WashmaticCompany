import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from "../images/logo.png";

const Footer = () => {
  const { t, dir } = useLanguage();

  const linkStyle = "text-blue-200 hover:text-white transition-colors duration-200 block py-1";

  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6 border-t border-blue-900" dir={dir}>
      <div className="container mx-auto px-4">

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* القسم الأول: البراند */}
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-12 h-12 bg-white rounded-lg p-1 object-contain" />
                <span className="font-bold text-xl">{t('hero.title')}</span>
              </a>
            </Link>
            <p className="text-blue-300 text-sm leading-relaxed max-w-xs">
              {t('about.mission_text')}
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-300 border-b border-blue-800 pb-2">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/"><a className={linkStyle}>{t('nav.home')}</a></Link></li>
              <li><Link href="/products"><a className={linkStyle}>{t('nav.products')}</a></Link></li>
              <li><Link href="/agencies"><a className={linkStyle}>{t('nav.agencies')}</a></Link></li>
              <li><Link href="/contact"><a className={linkStyle}>{t('nav.contact')}</a></Link></li>
            </ul>
          </div>

          {/* الشركة */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-300 border-b border-blue-800 pb-2">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/favorites"><a className={linkStyle}>{t('nav.favorites')}</a></Link></li>
              <li><Link href="/quotation"><a className={linkStyle}>{t('nav.quotation')}</a></Link></li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-300 border-b border-blue-800 pb-2">
              {t('contact.info')}
            </h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex gap-2 items-start">
                <MapPin size={18} className="text-blue-400 mt-0.5" />
                <span>{t('about.address')}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+201009013000" className="hover:text-white transition">+20 100 901 3000</a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:Wash_matic2@yahoo.com" className="hover:text-white transition break-all">Wash_matic2@yahoo.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* الشريط السفلي */}
        <div className="border-t border-blue-900 pt-6 flex flex-col md:flex-row justify-between items-center text-blue-400 text-xs gap-4">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">{t('footer.privacy')}</span>
            <span className="cursor-pointer hover:text-white">{t('footer.terms')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;