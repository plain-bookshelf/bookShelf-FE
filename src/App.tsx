import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ListProvider } from "./shared/contexts/BorrowListContext";
import { Provider as ManagerProvider } from "./shared/contexts/ManagementContext";
import { Provider as UserProvider } from "./shared/contexts/UserContext";
import Router from "./router";

/**
 * App 전체에서 공유하는 QueryClient 인스턴스다.
 *
 * 기존에는 App 함수 안에서 new QueryClient()를 만들고 있었는데,
 * 그러면 App이 다시 렌더될 때마다 캐시가 새로 생성되어
 * React Query의 캐시/재시도/상태 유지 이점을 잃게 된다.
 *
 * 따라서 애플리케이션 생명주기 동안 한 번만 만들어 재사용한다.
 */
const queryClient = new QueryClient();

function App() {
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
