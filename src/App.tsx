import { RouterProvider } from "react-router-dom";
import "./globals.css";
import { router } from "./presentation/routes/route";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
