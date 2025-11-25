import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Plans from './components/Plans';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import ServiceModal from './components/ServiceModal';
import PlanModal from './components/PlanModal';
import RegisterModal from './components/RegisterModal';
import About from './components/About';
import Doctors from './components/Doctors';
import PatientsPage from './pages/PatientsPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AppointmentModal />
      <ServiceModal />
      <PlanModal />
      <RegisterModal />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Doctors />
              <Plans />
            </>
          } />
          <Route path="/pacientes" element={<PatientsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
