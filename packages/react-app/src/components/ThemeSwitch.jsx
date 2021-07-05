import React, { useState, useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    themeChange(false);
    console.log('theme', theme);
    if (theme === 'dracula') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(previous => {
      return !previous;
    });
  };

  return (
    <div className="main fade-in" style={{ position: 'fixed', right: 8, bottom: 8 }}>
      <label style={{ padding: 8 }} htmlFor="label" className="label">
        {!isDarkMode ? '☀️' : '🌜'}
        <input type="checkbox" checked={isDarkMode} className="toggle" />
        <span
          data-toggle-theme="dracula,bumblebee"
          data-act-class="active"
          className="toggle-mark"
          onClick={toggleTheme}
        />
      </label>
    </div>
  );
}
