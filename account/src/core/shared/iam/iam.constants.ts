export const REQUEST_USER_KEY = 'user';

export enum AuthenticationErrorMessages {
  UnspecifiedProvider = 'Unspecified provider',
  WrongPassword = 'Password doest not match',
  WrongTelegramId = 'Telegram id doest not match',
  AccessDenied = 'Access denied',
  NewPasswordIsEqual = 'New password is equal to previous',
}
