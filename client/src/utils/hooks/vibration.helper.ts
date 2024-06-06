export const vibrate = () => {
  // @ts-ignore
  window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
};
