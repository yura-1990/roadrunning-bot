import { useState, useEffect } from 'react';

const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState({});
  const [user, setUser] = useState(null);
  const [initData, setInitData] = useState(null);
  const [language, setLanguage] = useState('en');

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

      let userLanguage = tg.initDataUnsafe?.user?.language || 'en';

      if(localStorage.getItem('web-language')){
        userLanguage = localStorage.getItem('web-language')
      } else {
        localStorage.setItem('web-language', userLanguage)
      }
      
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
