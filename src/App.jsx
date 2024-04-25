import "./App.css";
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
        <UserContextProvider>
          <TotalAmountProvider>
            <ThemeContextProvider>
              <Router />
            </ThemeContextProvider>
          </TotalAmountProvider>
        </UserContextProvider>
        <ReactQueryDevtools zoom={2} />
      </QueryClientProvider>
    </>
  );
}

export default App;
