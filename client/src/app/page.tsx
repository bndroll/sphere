import QueryClientContextProvider from "@/utils/context/QueryClientContext";
import { AuthView } from "@/components/AuthView/AuthView";
import Questionnaire from '@/app/testing/page';

export default function Home() {
  return (
    <QueryClientContextProvider>
      {/*<AuthView />*/}
      <Questionnaire />
    </QueryClientContextProvider>
  );
}
