import Navigation from './Components/Navigation'
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
            <footer>
                <small> Copyright 2023 XT</small>
            </footer>
        </>
    )
}