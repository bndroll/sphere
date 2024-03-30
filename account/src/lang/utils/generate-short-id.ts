import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

export const generateShortId = (): string => {
  return uid.rnd();
};
