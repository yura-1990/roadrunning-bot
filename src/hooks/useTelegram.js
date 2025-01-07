const tg = window.Telegram.WebApp;

const useTelegram = () => {

  const userLanguage = tg.initDataUnsafe?.user?.language || 'en';

  return {
    tg,
    userLanguage,
    user: tg.initDataUnsafe?.user
  };
};

export default useTelegram;
