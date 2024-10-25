import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import Poker from "./components/Poker"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "Poker",
        element: <Poker />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;