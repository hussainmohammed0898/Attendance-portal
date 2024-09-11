import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from "./routes/Routes";



function App() {

  const routes = createBrowserRouter(route);
  return (
    <>
    <RouterProvider router={routes} />
    </>
  )
}

export default App
