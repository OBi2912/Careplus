import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const PlanModal = () => {
    const { t } = useLanguage();
    const { isModalOpen, closeModal, modalType, modalData } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                closeModal();
                setIsSubmitted(false);
            }, 2000);
        }, 1000);
    };

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen && modalType === 'plan') {
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }

        return undefined;
    }, [isModalOpen, modalType, closeModal]);

    // Only render if it's a plan modal
    if (modalType !== 'plan') return null;

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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[59]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-[95%] md:w-full max-w-2xl overflow-hidden pointer-events-auto max-h-[80vh] overflow-y-auto">
                            {isSubmitted ? (
                                <div className="p-12 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">{t.planModal.success}</h3>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 md:p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold">{t.planModal.title}</h3>
                                            <p className="text-sm text-white/90 mt-1">{t.planModal.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={closeModal}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-3 md:p-6 space-y-2 md:space-y-4">
                                        {/* Plan Selection - Read Only */}
                                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                                            <label className="block text-xs md:text-sm font-medium text-text-main mb-2">{t.planModal.plan}</label>
                                            <div className="text-2xl font-bold text-primary">{modalData?.planName || 'Plan'}</div>
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.name}</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Email and Phone */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.email}</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.phone}</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.address}</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>

                                        {/* City and Zip Code */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.city}</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.zipCode}</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Members and Start Date */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.members}</label>
                                                <select className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.planModal.startDate}</label>
                                                <input
                                                    type="date"
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="pt-2 md:pt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="flex-1 btn btn-outline py-2 md:py-3"
                                            >
                                                {t.planModal.cancel}
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 btn btn-primary py-2 md:py-3"
                                            >
                                                {t.planModal.submit}
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

export default PlanModal;
