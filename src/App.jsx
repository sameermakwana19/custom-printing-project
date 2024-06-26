import "./styles/main.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./Routes/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import TotalAmountProvider from "./context/TotalAmount/TotalAmountProvider";
import UserContextProvider from "./context/User/UserContext";
import ThemeContextProvider from "./context/ThemeContext/ThemeContextProvider";
// import SearchParamsProvider from "./context/SearchParamsProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <UserContextProvider>
            <TotalAmountProvider>
              <Router />
            </TotalAmountProvider>
          </UserContextProvider>
        </ThemeContextProvider>
        {/* <ReactQueryDevtools zoom={10} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
