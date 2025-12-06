import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const RegisterModal = () => {
    const { t } = useLanguage();
    const { isModalOpen, closeModal, modalType } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        gender: '',
        acceptTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Validate terms acceptance
        if (!formData.acceptTerms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                closeModal();
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    birthDate: '',
                    gender: '',
                    acceptTerms: false
                });
            }, 2000);
        }, 1000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen && modalType === 'register') {
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }

        return undefined;
    }, [isModalOpen, modalType, closeModal]);

    // Only render if it's a register modal
    if (modalType !== 'register') return null;

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
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto max-h-[85vh] overflow-y-auto">
                            {isSubmitted ? (
                                <div className="p-12 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">{t.registerModal.success}</h3>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 md:p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                                                <User size={24} />
                                                {t.registerModal.title}
                                            </h3>
                                            <p className="text-sm text-white/90 mt-1">{t.registerModal.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={closeModal}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-3 md:p-6 space-y-2 md:space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.name}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Email and Phone */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.email}</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.phone}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Password and Confirm Password */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.password}</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={6}
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.confirmPassword}</label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={6}
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Birth Date and Gender */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.birthDate}</label>
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={formData.birthDate}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-medium text-text-main mb-1">{t.registerModal.gender}</label>
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                                                >
                                                    <option value="">Seleccionar...</option>
                                                    <option value="male">{t.registerModal.male}</option>
                                                    <option value="female">{t.registerModal.female}</option>
                                                    <option value="other">{t.registerModal.other}</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Terms and Conditions */}
                                        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                                            <input
                                                type="checkbox"
                                                name="acceptTerms"
                                                checked={formData.acceptTerms}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/20"
                                            />
                                            <label className="text-sm text-text-muted">
                                                {t.registerModal.terms}
                                            </label>
                                        </div>

                                        {/* Buttons */}
                                        <div className="pt-2 md:pt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="flex-1 btn btn-outline py-2 md:py-3"
                                            >
                                                {t.registerModal.cancel}
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 btn btn-primary py-2 md:py-3"
                                            >
                                                {t.registerModal.submit}
                                            </button>
                                        </div>

                                        {/* Login Link */}
                                        <div className="text-center pt-2 border-t border-border">
                                            <p className="text-sm text-text-muted">
                                                {t.registerModal.haveAccount}{' '}
                                                <button
                                                    type="button"
                                                    className="text-primary font-medium hover:underline"
                                                >
                                                    {t.registerModal.login}
                                                </button>
                                            </p>
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

export default RegisterModal;
