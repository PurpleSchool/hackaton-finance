import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import MainPage from "./pages/MainPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";


const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  {
    path: "login",
    element: <LoginPage />,
  },
  { path: "registration", element: <RegistrationPage /> },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </React.StrictMode>
);
