import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Doctors = () => {
    const { t } = useLanguage();

    const specialtyColors = [
        "bg-red-50 text-red-600",
        "bg-blue-50 text-blue-600",
        "bg-green-50 text-green-600",
        "bg-purple-50 text-purple-600",
        "bg-orange-50 text-orange-600",
        "bg-teal-50 text-teal-600"
    ];

    return (
        <section id="doctors" className="py-20 bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">{t.doctors.title}</h2>
                    <p className="section-subtitle">
                        {t.doctors.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.doctors.items.map((doctor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Doctor Avatar */}
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UserCircle className="text-white" size={48} />
                                </div>

                                {/* Doctor Name */}
                                <h3 className="text-xl font-bold text-black mb-2">
                                    {doctor.name}
                                </h3>

                                {/* Specialty Badge */}
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-3 ${specialtyColors[index % specialtyColors.length]}`}>
                                    <Award size={16} />
                                    {doctor.specialty}
                                </div>

                                {/* Experience */}
                                <p className="text-black text-sm">
                                    {doctor.experience}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Doctors;
