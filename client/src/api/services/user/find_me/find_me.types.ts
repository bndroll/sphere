export type TelegramAuthRequest = {
  username: string;
  telegramId: string;
};

export type ManualAuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
