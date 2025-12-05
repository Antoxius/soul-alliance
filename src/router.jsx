import { createBrowserRouter } from "react-router";
import { useEffect } from "react";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Component to handle GitHub Pages redirects
function RedirectHandler() {
  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      delete sessionStorage.redirect;
      window.history.replaceState(null, null, redirect);
    }
  }, []);
  return null;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <RedirectHandler />
                <Layout />
            </>
        ),
        children: [
                {
                    index: true,
                    element: <Home/>     
                },
                {
                    path: "events",
                    element: <Events/>
                },
                {
                    path: "contact",
                    element: <NotFound/>
                },
                {
                    path: "about",
                    element: <About/>
                },
                {
                    path: "*",
                    element: <NotFound/>
                }
            ]
        }
    ], {
        basename: "/soul-alliance"
    });
    export default router;