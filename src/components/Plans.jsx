import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Plans = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    const prices = ["29", "59", "99"];
    const recommendedIndex = 1;

    return (
        <section id="plans" className="py-20 bg-slate-50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t.plans.title}</h2>
                    <p className="section-subtitle">
                        {t.plans.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {t.plans.items.map((plan, index) => {
                        const isRecommended = index === recommendedIndex;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-white rounded-2xl p-8 border ${isRecommended
                                    ? 'border-primary shadow-xl scale-105 z-10'
                                    : 'border-border shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {isRecommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                                        {t.plans.popular}
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-text-main mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-text-main">${prices[index]}</span>
                                    <span className="text-text-muted">{t.plans.month}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-text-muted">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                                <Check size={12} />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => openModal('plan', { planName: plan.name })}
                                    className={`w-full btn ${isRecommended ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {t.plans.select}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Plans;
