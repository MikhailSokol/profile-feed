import Home from "./pages/ui/Home";
import { setGlobalErrorHandler } from "@/shared/api/client";
import { useUI } from "./shared/store/ui";

export default function App() {
  const { setGlobalError } = useUI();

  setGlobalErrorHandler((error) => {
    setGlobalError(error);
  });

  return <Home />;
}
