import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    // Load patients from localStorage
    const [patients, setPatients] = useState(() => {
        const saved = localStorage.getItem('careplus_patients');
        return saved ? JSON.parse(saved) : [];
    });

    // Load appointments from localStorage
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('careplus_appointments');
        return saved ? JSON.parse(saved) : [];
    });

    // Save patients to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('careplus_patients', JSON.stringify(patients));
    }, [patients]);

    // Save appointments to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('careplus_appointments', JSON.stringify(appointments));
    }, [appointments]);

    const addPatient = (patient) => {
        const newPatient = {
            ...patient,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setPatients(prev => [...prev, newPatient]);
        return newPatient;
    };

    const addAppointment = (appointment) => {
        const newAppointment = {
            ...appointment,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        setAppointments(prev => [...prev, newAppointment]);

        // Check if patient exists, if not add them
        const existingPatient = patients.find(
            p => p.email === appointment.email || p.phone === appointment.phone
        );

        if (!existingPatient) {
            addPatient({
                name: appointment.name,
                email: appointment.email,
                phone: appointment.phone
            });
        }

        return newAppointment;
    };

    const deleteAppointment = (id) => {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
    };

    const deletePatient = (id) => {
        setPatients(prev => prev.filter(patient => patient.id !== id));
    };

    return (
        <DataContext.Provider value={{
            patients,
            appointments,
            addPatient,
            addAppointment,
            deleteAppointment,
            deletePatient
        }}>
            {children}
        </DataContext.Provider>
    );
};
