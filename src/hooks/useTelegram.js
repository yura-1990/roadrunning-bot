import { useState, useEffect } from 'react';

const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState({});
  const [user, setUser] = useState(null);
  const [initData, setInitData] = useState(null);
  const [language, setLanguage] = useState('en'); // Default language set to 'en'

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();
      setIsReady(true);

      setUser(tg.initDataUnsafe?.user || null);
      setInitData(tg.initData);

      const updateTheme = () => setTheme(tg.themeParams);
      updateTheme();
      tg.onEvent('themeChanged', updateTheme);

      // Set the Telegram user's language (or default to 'en' if not available)
      const userLanguage = tg.initDataUnsafe?.user?.language || 'en';
      setLanguage(userLanguage);

      return () => {
        tg.offEvent('themeChanged', updateTheme);
      };
    }
  }, []);

  const closeWebApp = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  const expandWebApp = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  };

  return {
    isReady,
    theme,
    user,
    initData,
    language,  // Include the language
    closeWebApp,
    expandWebApp,
  };
};

export default useTelegram;
