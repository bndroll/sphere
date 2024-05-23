import { FeedPageContainer } from "@/app/feed/components/FeedPageContainer/FeedPageContainer";
import Transition from "@/components/Transition/Transition";

export default async function Questionnaire() {
  return (
    <Transition>
      <FeedPageContainer />
    </Transition>
  );
}
