import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 bg-slate-50">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
                                alt="Medical Team"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title text-left mb-6">{t.about.title}</h2>
                        <h3 className="text-2xl font-semibold text-text-main mb-6">
                            {t.about.subtitle}
                        </h3>
                        <p className="text-text-muted mb-6 text-lg leading-relaxed">
                            {t.about.description1}
                        </p>
                        <p className="text-text-muted mb-8 text-lg leading-relaxed">
                            {t.about.description2}
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            {t.about.stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-border">
                                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-xs text-text-muted font-medium uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
