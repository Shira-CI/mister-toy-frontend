import { NavLink } from "react-router-dom"
import { LoginSignup } from "./login-signup"
import {useState} from 'react'
import {userService} from '../services/user.service.js'

export function AppHeader() {
    const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        userService
            .logout()
            .then(() => { setUser(null) })
    }

    function onChangeLoginStatus(user) {
        setUser(user)
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
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )}
    

        </header>


    )
}