import React, { useState, useEffect } from 'react';
// import { useThemeSwitcher } from 'react-css-theme-switcher';
import { themeChange } from 'theme-change';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = localStorage.getItem('theme');

  // if (theme === 'black') {
  //   setIsDarkMode(!isDarkMode);
  // }

  // const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  useEffect(() => {
    if (theme === 'black') {
      setIsDarkMode(true);
    }
    themeChange(false);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(previous => {
      // switcher({ theme: previous ? themes.cyberpunk : themes.black });
      return !previous;
    });
  };

  // // Avoid theme change flicker
  // if (status === 'loading') {
  //   return null;
  // }

  return (
    <div className="main fade-in" style={{ position: 'fixed', right: 8, bottom: 8 }}>
      <label style={{ padding: 8 }} htmlFor="label" className="label">
        {!isDarkMode ? '☀️' : '🌜'}
        <input type="checkbox" checked={isDarkMode} className="toggle" />
        <span
          data-toggle-theme="fantasy,synthwave"
          data-act-class="active"
          className="toggle-mark"
          onClick={toggleTheme}
        />
      </label>
    </div>
  );
}
