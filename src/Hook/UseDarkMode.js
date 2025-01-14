import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Alapértelmezett mód betöltése a localStorage-ból
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Mód mentése
      return newMode;
    });
  };

  useEffect(() => {
    // Body osztály frissítése az állapot alapján
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]); // Újra alkalmazza az osztályokat, ha az állapot változik

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
