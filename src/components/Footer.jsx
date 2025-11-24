import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, setLanguage, language } = useLanguage();

    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <Heart fill="currentColor" size={18} />
                            </div>
                            <span>Careplus</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Youtube size={18} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">{t.footer.company}</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">{t.footer.about}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{t.footer.careers}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{t.footer.blog}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{t.footer.press}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">{t.footer.servicesTitle}</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            {t.services.items.map((service, index) => (
                                <li key={index}><a href="#" className="hover:text-primary transition-colors">{service.title}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">{t.footer.contact}</h4>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li>av 123</li>
                            <li>contacto@careplus.com</li>
                            <li>+52 (55) 1234 5678</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage('es')}
                            className={`flex items-center gap-2 transition-colors ${language === 'es' ? 'text-white' : 'hover:text-white'}`}
                        >
                            <span className="text-lg">🇪🇸</span>
                            <span>Español</span>
                        </button>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`flex items-center gap-2 transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                        >
                            <span className="text-lg">🇺🇸</span>
                            <span>English</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
