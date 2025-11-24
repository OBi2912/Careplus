import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AppointmentModal />
      <ServiceModal />
      <PlanModal />
      <RegisterModal />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Plans />
      </main>
      <Footer />
    </div>
  );
}

export default App;
