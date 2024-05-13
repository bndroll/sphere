export enum StartMessageType {
  None = 'None',
  Sign = 'Sign',
  Bind = 'Bind',
}

export class ParseStartMessageResponseDto {
  type: StartMessageType;
  message: string;
}
