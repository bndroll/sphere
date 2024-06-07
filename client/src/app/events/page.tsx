import Transition from "@/components/Transition/Transition";
import UserStoreContextProvider from "@/utils/context/UserStoreContext";
import { EventsFeed } from "@/app/events/eventsFeed/EventsFeed";

export default async function Events() {
  return (
    <UserStoreContextProvider>
      <Transition>
        <EventsFeed />
      </Transition>
    </UserStoreContextProvider>
  );
}
