import { NavLink, useNavigate } from "react-router-dom"
import { LoginSignup } from "./login-signup"
import { useSelector } from 'react-redux'

import { useEffect, useState } from 'react'
import { logout } from '../store/user.action.js'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoggedIn(user)
    }, [user])


    async function onLogout() {
        try {
            navigate('/')
            await logout()
            // showSuccessMsg(`Bye now`)
            console.log('logout')
        } catch (err) {
            // showErrorMsg('Cannot logout')
        }
    }


    return (
        <header className="app-header full">

            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>

            {user ? (
                < section >
                    <h2>Hello {user.fullname}</h2>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}


        </header>


    )
}