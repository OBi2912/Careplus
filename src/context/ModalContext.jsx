import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'appointment' or 'service'
    const [modalData, setModalData] = useState(null);

    const openModal = (type = 'appointment', data = null) => {
        setModalType(type);
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setModalType(null);
            setModalData(null);
        }, 300); // Wait for animation
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, modalType, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
