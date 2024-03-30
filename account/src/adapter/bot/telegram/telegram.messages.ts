import { capitalize } from 'src/lang/utils/capitalize';

export namespace TelegramMessages {
  export const startMessageWithName = (name: string) => {
    return `Привет ${capitalize(name)}, это приложение Maison`;
  };

  export const shareContact = () => {
    return `Спасибо, мы привязали этот номер к вашему профилю`;
  };
}
