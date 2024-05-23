import { FeedPageContainer } from "@/app/feed/components/FeedPageContainer/FeedPageContainer";
import Transition from "@/components/Transition/Transition";
import UserStoreContextProvider from "@/utils/context/UserStoreContext";

export default async function Questionnaire() {
  return (
    <UserStoreContextProvider>
      <Transition>
        <FeedPageContainer />
      </Transition>
    </UserStoreContextProvider>
  );
}
