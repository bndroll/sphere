export const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
};

export const variants2 = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 1,
    };
  },
};

export const swipeConfidenceThreshold = 100;

export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const slideTransition = {
  x: { type: "spring", stiffness: 1000, damping: 100 },
  opacity: { duration: 0.2 },
};

export const cardTransition = {
  // y: { type: "spring", stiffness: 1000, damping: 100 },
  // opacity: { duration: 0.1 },
};
