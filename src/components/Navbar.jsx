import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { openModal } = useModal();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId) => {
        // Close menu first
        setIsOpen(false);
        
        // Small delay to allow menu to close before scrolling
        setTimeout(() => {
            // If not on home page, navigate to home first
            if (location.pathname !== '/') {
                navigate('/');
                // Wait for navigation to complete, then scroll
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            } else {
                // Already on home page, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 100);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'glass shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-dark">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <Heart fill="currentColor" size={24} />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary">
                        Careplus
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-4">
                    <button onClick={() => handleNavClick('services')} className="text-text-main hover:text-primary font-medium transition-colors text-sm">{t.navbar.services}</button>
                    <button onClick={() => handleNavClick('plans')} className="text-text-main hover:text-primary font-medium transition-colors text-sm">{t.navbar.plans}</button>
                    <button onClick={() => handleNavClick('doctors')} className="text-text-main hover:text-primary font-medium transition-colors text-sm">{t.navbar.doctors}</button>
                    <button onClick={() => handleNavClick('contact')} className="text-text-main hover:text-primary font-medium transition-colors text-sm">{t.navbar.contact}</button>
                    <Link to="/pacientes" className="text-text-main hover:text-primary font-medium transition-colors text-sm">{t.navbar.patients}</Link>
                    <button onClick={() => openModal('register')} className="btn btn-outline text-sm px-3 py-2">
                        {t.navbar.register}
                    </button>
                    <button onClick={() => openModal('appointment')} className="btn btn-primary text-sm px-3 py-2">
                        {t.navbar.book}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-text-main p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-xl z-40 overflow-hidden"
                    >
                        <div className="container py-6 flex flex-col gap-2">
                            <button onClick={() => handleNavClick('services')} className="text-lg font-medium text-left text-black w-full px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100">{t.navbar.services}</button>
                            <button onClick={() => handleNavClick('plans')} className="text-lg font-medium text-left text-black w-full px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100">{t.navbar.plans}</button>
                            <button onClick={() => handleNavClick('doctors')} className="text-lg font-medium text-left text-black w-full px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100">{t.navbar.doctors}</button>
                            <button onClick={() => handleNavClick('contact')} className="text-lg font-medium text-left text-black w-full px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100">{t.navbar.contact}</button>
                            <Link to="/pacientes" onClick={() => setIsOpen(false)} className="text-lg font-medium text-black block w-full px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100">{t.navbar.patients}</Link>

                            <div className="grid grid-cols-2 gap-4 mt-4 px-4 pb-2">
                                <button onClick={() => { setIsOpen(false); openModal('register'); }} className="btn btn-outline w-full justify-center">
                                    {t.navbar.register}
                                </button>
                                <button onClick={() => { setIsOpen(false); openModal('appointment'); }} className="btn btn-primary w-full justify-center">
                                    {t.navbar.book}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
