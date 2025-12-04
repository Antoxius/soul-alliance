import { Link } from "react-router";

export default function NotFound(){

    return(
        <>
        <h1>404 Not Found</h1>
        <p>Siden findes ikke</p>
        <Link to="/">Gå til forsiden</Link>
        </>
    )
}