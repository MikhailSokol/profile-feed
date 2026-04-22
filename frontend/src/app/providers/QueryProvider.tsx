import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

type Props = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};
