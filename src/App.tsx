import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./router";
import { Provider as UserProvider} from "./components/contexts/UserContext";
import { Provider as ManagerProvider } from "./components/contexts/ManagementContext";
import { Provider as ListProvider } from "./components/contexts/BorrowListContext";


 function App() {  
   const queryClient = new QueryClient();

  return (
    <UserProvider>
      <ManagerProvider>
        <ListProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ListProvider>
      </ManagerProvider>
    </UserProvider>
  );
}

export default App;