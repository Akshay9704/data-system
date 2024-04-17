import Signup from "./pages/signup";
import Signin from "./pages/signin";
import DataTable from "./pages/table";
import UserContextProvider from "./context/UserContextProvider"
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Signin />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/table',
      element: <DataTable />,
    }
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router}>
        <Signin />
        <Signup />
        <DataTable />
      </RouterProvider>
    </UserContextProvider>
  );
}

export default App;
