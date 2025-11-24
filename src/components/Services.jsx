import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Stethoscope, Pill, Activity, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Services = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    const icons = [
        <Shield size={32} />,
        <Stethoscope size={32} />,
        <Pill size={32} />,
        <Activity size={32} />,
        <Users size={32} />
    ];

    const colors = [
        "bg-blue-50 text-blue-600",
        "bg-teal-50 text-teal-600",
        "bg-indigo-50 text-indigo-600",
        "bg-rose-50 text-rose-600",
        "bg-purple-50 text-purple-600"
    ];

    const serviceKeys = ['insurance', 'consultations', 'pharmacy', 'surgery', 'specialists'];

    const handleServiceClick = (index) => {
        const key = serviceKeys[index];
        const data = t.serviceDetails[key];
        openModal('service', data);
    };

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t.services.title}</h2>
                    <p className="section-subtitle">
                        {t.services.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.services.items.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleServiceClick(index)}
                            className="card group cursor-pointer"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colors[index]} transition-transform group-hover:scale-110`}>
                                {icons[index]}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-text-main">{service.title}</h3>
                            <p className="text-text-muted leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
