import { useRoutes } from "react-router-dom";
import RootRoutes from "./routes/Routes";

function App() {
  const router = useRoutes(RootRoutes);
  return router;
}

export default App;
