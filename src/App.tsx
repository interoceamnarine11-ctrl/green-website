/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExecutiveProfileSection } from './components/ExecutiveProfileSection';
import { CoreCompetenciesSection } from './components/CoreCompetenciesSection';
import { SectorsSection } from './components/SectorsSection';
import { FootprintMapSection } from './components/FootprintMapSection';
import { ProjectTrackRecordSection } from './components/ProjectTrackRecordSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedSectorForContact, setSelectedSectorForContact] = useState<string>('Agriculture');
  const [customMessage, setCustomMessage] = useState<string>('');

  const handleScrollToContact = (sector?: string, message?: string) => {
    if (sector) {
      setSelectedSectorForContact(sector);
    }
    if (message) {
      setCustomMessage(message);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSectors = () => {
    const el = document.getElementById('sectors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar onContactClick={() => handleScrollToContact()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Port Image Showcase */}
        <Hero 
          onContactClick={() => handleScrollToContact()} 
          onExploreClick={handleScrollToSectors}
        />

        {/* Executive Profile Section */}
        <ExecutiveProfileSection 
          onContactClick={() => handleScrollToContact()} 
        />

        {/* Core Competencies & Capabilities with Photos */}
        <CoreCompetenciesSection 
          onContactClick={() => handleScrollToContact()} 
        />

        {/* Key Sectors & Scope of Supply with High-Res Imagery */}
        <SectorsSection 
          onContactSector={(sectorName) => handleScrollToContact(sectorName, `Inquiry regarding bulk procurement and supply for ${sectorName}.`)} 
        />

        {/* Operational Footprint & Continental Trade Corridors */}
        <FootprintMapSection 
          onContactHub={(countryName) => handleScrollToContact(undefined, `Inquiry regarding maritime dispatch and supply corridor to ${countryName}.`)} 
        />

        {/* Major Executed Projects & Sovereign Tenders */}
        <ProjectTrackRecordSection 
          onContactProject={(projectTitle) => handleScrollToContact(undefined, `Inquiry regarding tenders similar to: ${projectTitle}.`)} 
        />

        {/* Corporate Contact & Tender Desk Section */}
        <ContactSection 
          initialSector={selectedSectorForContact}
          initialMessage={customMessage}
        />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
