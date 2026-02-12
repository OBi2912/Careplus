import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';

const ServiceModal = () => {
    const { isModalOpen, modalType, modalData, closeModal, openModal } = useModal();
    const { t } = useLanguage();

    // Only render if it's a service modal
    if (modalType !== 'service' || !modalData) return null;

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen && modalType === 'service') {
            window.addEventListener('keydown', handleEsc);
        }

        return () => window.removeEventListener('keydown', handleEsc);
    }, [isModalOpen, modalType, closeModal]);

    const handleBookNow = () => {
        // Switch to appointment modal
        closeModal();
        setTimeout(() => {
            openModal('appointment');
        }, 300);
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[59]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto max-h-[85vh] overflow-y-auto">
                            <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary to-secondary overflow-hidden">
                                <div className="absolute inset-0 bg-black/10"></div>
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2"
                                >
                                    <X size={24} />
                                </button>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{modalData.title}</h3>
                                    <div className="h-1 w-20 bg-white/50 rounded-full"></div>
                                </div>
                            </div>

                            <div className="p-3 md:p-8">
                                <p className="text-sm md:text-lg text-text-muted leading-relaxed mb-4 md:mb-8">
                                    {modalData.description}
                                </p>

                                <h4 className="font-bold text-text-main mb-2 md:mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    Beneficios Clave
                                </h4>

                                <div className="grid md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-8">
                                    {modalData.features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                                                <Check size={12} />
                                            </div>
                                            <span className="text-sm text-text-main font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={closeModal}
                                        className="btn btn-outline py-2 md:py-3"
                                    >
                                        {t.modal.close}
                                    </button>
                                    <button
                                        onClick={handleBookNow}
                                        className="btn btn-primary group py-2 md:py-3"
                                    >
                                        {t.navbar.book}
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
