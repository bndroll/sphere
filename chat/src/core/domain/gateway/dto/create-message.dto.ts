export namespace CreateMessageContract {
  export const topic = 'message.create';

  export class CreateMessageDto {
    chatId: string;
    profileId: string;
    text: string;
  }
}
