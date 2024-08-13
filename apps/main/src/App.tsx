import { MainRouter } from "./router/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
};
