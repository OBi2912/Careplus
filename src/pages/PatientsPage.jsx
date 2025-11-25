import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Calendar, User, Mail, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientsPage = () => {
    const { patients, appointments, deletePatient, deleteAppointment } = useData();
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState('appointments');

    const t = {
        es: {
            title: 'Gestión de Pacientes',
            subtitle: 'Administra tus pacientes y citas programadas',
            appointmentsTab: 'Citas Programadas',
            patientsTab: 'Pacientes Registrados',
            noAppointments: 'No hay citas programadas.',
            noPatients: 'No hay pacientes registrados.',
            name: 'Nombre',
            email: 'Email',
            phone: 'Teléfono',
            date: 'Fecha',
            time: 'Hora',
            service: 'Servicio',
            message: 'Mensaje',
            status: 'Estado',
            actions: 'Acciones',
            delete: 'Eliminar',
            pending: 'Pendiente',
            confirmed: 'Confirmada',
            cancelled: 'Cancelada',
            total: 'Total'
        },
        en: {
            title: 'Patient Management',
            subtitle: 'Manage your patients and scheduled appointments',
            appointmentsTab: 'Scheduled Appointments',
            patientsTab: 'Registered Patients',
            noAppointments: 'No scheduled appointments.',
            noPatients: 'No registered patients.',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            date: 'Date',
            time: 'Time',
            service: 'Service',
            message: 'Message',
            status: 'Status',
            actions: 'Actions',
            delete: 'Delete',
            pending: 'Pending',
            confirmed: 'Confirmed',
            cancelled: 'Cancelled',
            total: 'Total'
        }
    };

    const content = t[language];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-black mb-2">
                    {content.title}
                </h1>
                <p className="text-lg text-black">
                    {content.subtitle}
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-black mb-1">
                                {content.appointmentsTab}
                            </p>
                            <p className="text-3xl font-bold text-primary">
                                {appointments.length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Calendar className="text-primary" size={24} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-black mb-1">
                                {content.patientsTab}
                            </p>
                            <p className="text-3xl font-bold text-secondary">
                                {patients.length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                            <User className="text-secondary" size={24} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('appointments')}
                    className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'appointments'
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                >
                    {content.appointmentsTab}
                    {activeTab === 'appointments' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('patients')}
                    className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'patients'
                        ? 'text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                >
                    {content.patientsTab}
                    {activeTab === 'patients' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
            </div>

            {/* Content */}
            {activeTab === 'appointments' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    {appointments.length === 0 ? (
                        <div className="glass p-12 rounded-2xl text-center">
                            <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                {content.noAppointments}
                            </p>
                        </div>
                    ) : (
                        appointments.map((apt, index) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass p-6 rounded-2xl hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <User className="text-primary" size={18} />
                                            <span className="font-semibold text-black">
                                                {apt.name}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center gap-2 text-black">
                                                <Mail size={16} />
                                                {apt.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-black">
                                                <Phone size={16} />
                                                {apt.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-black">
                                                <Calendar size={16} />
                                                {formatDate(apt.date)}
                                            </div>
                                            <div className="flex items-center gap-2 text-black">
                                                <Clock size={16} />
                                                {apt.time}
                                            </div>
                                        </div>

                                        {apt.service && (
                                            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                                                {apt.service}
                                            </div>
                                        )}

                                        {apt.message && (
                                            <p className="text-sm text-black italic">
                                                "{apt.message}"
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => deleteAppointment(apt.id)}
                                        className="btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-600 self-end md:self-center"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    {patients.length === 0 ? (
                        <div className="glass p-12 rounded-2xl text-center">
                            <User className="mx-auto mb-4 text-gray-400" size={48} />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                {content.noPatients}
                            </p>
                        </div>
                    ) : (
                        patients.map((patient, index) => (
                            <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass p-6 rounded-2xl hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <User className="text-secondary" size={18} />
                                            <span className="font-semibold text-black text-lg">
                                                {patient.name}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            {patient.email && (
                                                <div className="flex items-center gap-2 text-black">
                                                    <Mail size={16} />
                                                    {patient.email}
                                                </div>
                                            )}
                                            {patient.phone && (
                                                <div className="flex items-center gap-2 text-black">
                                                    <Phone size={16} />
                                                    {patient.phone}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deletePatient(patient.id)}
                                        className="btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-600 self-end md:self-center"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default PatientsPage;
