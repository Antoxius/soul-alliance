import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
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
                    path: "events/:id",
                    element: <Events/>
                },
                {
                    path: "contact",
                    element: <Contact/>
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