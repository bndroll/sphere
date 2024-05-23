import QueryClientContextProvider from "@/utils/context/QueryClientContext";
import { AuthView } from "@/components/AuthView/AuthView";

export default async function Home() {
  return (
    <QueryClientContextProvider>
      <AuthView />
    </QueryClientContextProvider>
  );
}
