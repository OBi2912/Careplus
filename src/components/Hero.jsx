import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Hero = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4"></div>

            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-sm font-medium mb-6">
                        <Star size={16} fill="currentColor" />
                        <span>{t.hero.badge}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text-main">
                        {t.hero.title1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {t.hero.title2}
                        </span>
                    </h1>

                    <p className="text-lg text-text-muted mb-8 max-w-lg">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button onClick={openModal} className="btn btn-primary text-lg px-8">
                            {t.hero.start}
                        </button>
                        <a href="#about" className="btn btn-outline text-lg px-8 group">
                            {t.hero.learnMore}
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </a>
                    </div>

                    <div className="mt-12 flex items-center gap-8 text-text-muted text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-secondary" />
                            <span>{t.hero.iso}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-secondary" />
                            <span>{t.hero.attention}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1000&auto=format&fit=crop"
                            alt="Doctor with patient"
                            className="w-full h-auto object-cover"
                        />

                        {/* Floating Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-[200px]"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">{t.hero.happyPatients}</p>
                                <p className="font-bold text-gray-800">10k+</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
