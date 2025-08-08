
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';

// The Google Script URL is now hardcoded as requested to simplify the app.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-0YJynkgows6Ct5L0Nv3PO35-oCfyzASa7gjykbj8fEWJUHm9UsOU3tIzpCu46OCx/exec';

function App() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide initial confetti after a while to not be too distracting
    const timer = setTimeout(() => setShowConfetti(false), 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white relative">
      <BackgroundEffects showInitialConfetti={showConfetti} />
      <Header />
      <MainContent 
        scriptUrl={SCRIPT_URL}
      />
      <Footer />
    </div>
  );
}

export default App;
