import { Link } from "react-router";

export default function NotFound(){

    return(
        <>
        <h1>404 Not Found</h1>
        <p>Antoxius says this page doesn't exist</p>
        <Link to="/">Back to home!</Link>
        </>
    )
}