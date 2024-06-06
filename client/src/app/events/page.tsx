import Transition from "@/components/Transition/Transition";
import UserStoreContextProvider from "@/utils/context/UserStoreContext";
import { FeedPage } from "@/app/feed/components/FeedPage/FeedPage";

export default async function Events() {
  return (
    <UserStoreContextProvider>
      <Transition>
        <FeedPage />
      </Transition>
    </UserStoreContextProvider>
  );
}
