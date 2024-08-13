import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainRouter } from "./router/MainRouter";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
};
