import Navigation from './Components/Navigation'
import Footer from './Components/Footer'
import './App.css'
import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <>
            <header>
                <Navigation/>
            </header>
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    )
}