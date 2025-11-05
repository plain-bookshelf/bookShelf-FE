import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./router";
import { Provider } from "./components/contexts/UserContext";


function App() {  
  const queryClient = new QueryClient();

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;