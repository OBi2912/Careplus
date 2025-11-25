import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { useData } from '../context/DataContext';

const AppointmentModal = () => {
    const { t } = useLanguage();
    const { isModalOpen, closeModal, modalType, modalData } = useModal();
    const { addAppointment } = useData();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save appointment to local storage
        addAppointment(formData);

        // Show success message
        setIsSubmitted(true);
        setTimeout(() => {
            closeModal();
            setIsSubmitted(false);
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                service: '',
                message: ''
            });
        }, 2000);
    };

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen && (modalType === 'appointment' || modalType === 'service')) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => window.removeEventListener('keydown', handleEsc);
    }, [isModalOpen, modalType, closeModal]);

    // Only render if it's an appointment or service modal (not plan)
    if (modalType === 'plan' || (!isModalOpen)) return null;

    return (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto">
                            {isSubmitted ? (
                                <div className="p-12 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">{t.modal.success}</h3>
                                </div>
                            ) : (
                                <>
                                    <div className="p-6 border-b border-border flex items-center justify-between bg-slate-50">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-main">{t.modal.title}</h3>
                                            <p className="text-sm text-text-muted mt-1">{t.modal.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={closeModal}
                                            className="text-text-muted hover:text-text-main transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-1">{t.modal.name}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-text-main mb-1">{t.modal.email}</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-main mb-1">{t.modal.phone}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-text-main mb-1">{t.modal.date}</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-main mb-1">Hora</label>
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-1">{t.modal.service}</label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                                            >
                                                <option value="">Seleccionar servicio...</option>
                                                {t.services.items.map((service, index) => (
                                                    <option key={index} value={service.title}>{service.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-text-main mb-1">{t.modal.message}</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="3"
                                                className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="flex-1 btn btn-outline"
                                            >
                                                {t.modal.cancel}
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 btn btn-primary"
                                            >
                                                {t.modal.submit}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AppointmentModal;
