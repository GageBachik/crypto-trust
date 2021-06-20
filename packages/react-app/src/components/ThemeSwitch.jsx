import React, { useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [checked, setchecked] = useState(false);

  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = () => {
    setchecked(!checked);
    setIsDarkMode(previous => {
      switcher({ theme: previous ? themes.cyberpunk : themes.black });
      return !previous;
    });
  };

  // Avoid theme change flicker
  if (status === 'loading') {
    return null;
  }

  return (
    <div className="main fade-in" style={{ position: 'fixed', right: 8, bottom: 8 }}>
      <label style={{ padding: 8 }} htmlFor="label" className="label">
        {!isDarkMode ? '☀️' : '🌜'}
        <input type="checkbox" checked={checked} className="toggle" />
        <span className="toggle-mark" onClick={toggleTheme} />
      </label>
    </div>
  );
}
