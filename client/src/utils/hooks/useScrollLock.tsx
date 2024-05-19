export const useScrollLock = () => {
  const setScrollLock = () => {
    document.body.style.setProperty("overflow", "hidden");
  };

  const removeScrollLock = () => {
    document.body.style.removeProperty("overflow");
  };

  return { setScrollLock, removeScrollLock };
};
