import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'
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
                <div className="hidden md:flex items-center gap-8">
                    <a href="#services" className="text-text-main hover:text-primary font-medium transition-colors">{t.navbar.services}</a>
                    <a href="#plans" className="text-text-main hover:text-primary font-medium transition-colors">{t.navbar.plans}</a>
                    <a href="#doctors" className="text-text-main hover:text-primary font-medium transition-colors">{t.navbar.doctors}</a>
                    <a href="#contact" className="text-text-main hover:text-primary font-medium transition-colors">{t.navbar.contact}</a>
                    <button onClick={() => openModal('register')} className="btn btn-outline">
                        {t.navbar.register}
                    </button>
                    <button onClick={openModal} className="btn btn-primary">
                        {t.navbar.book}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-text-main"
                    onClick={() => setIsOpen(!isOpen)}
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
                        className="md:hidden bg-white border-b border-border overflow-hidden"
                    >
                        <div className="container py-4 flex flex-col gap-4">
                            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium">{t.navbar.services}</a>
                            <a href="#plans" onClick={() => setIsOpen(false)} className="text-lg font-medium">{t.navbar.plans}</a>
                            <a href="#doctors" onClick={() => setIsOpen(false)} className="text-lg font-medium">{t.navbar.doctors}</a>
                            <a href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">{t.navbar.contact}</a>
                            <button onClick={() => { setIsOpen(false); openModal('register'); }} className="btn btn-outline w-full">
                                {t.navbar.register}
                            </button>
                            <button onClick={() => { setIsOpen(false); openModal(); }} className="btn btn-primary w-full">
                                {t.navbar.book}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
