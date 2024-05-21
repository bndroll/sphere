import QueryClientContextProvider from "@/utils/context/QueryClientContext";
import { AuthView } from "@/components/AuthView/AuthView";

export default function Home() {
  return (
    <QueryClientContextProvider>
      <AuthView />
      {/*<Questionnaire />*/}
    </QueryClientContextProvider>
  );
}
