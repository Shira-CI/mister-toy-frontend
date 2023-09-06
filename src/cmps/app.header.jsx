import { NavLink, useNavigate } from "react-router-dom"
import { LoginSignup } from "./login.signup"
import { useSelector } from 'react-redux'

import { useEffect, useState } from 'react'
import { logout, login } from '../store/user.action.js'
import { LoginModal } from '../cmps/login.modal.jsx'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()
    // console.log(user, 'user')

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

    function openDemoLogin() {
        setIsModalOpen(true)
    }
    function closeDemoLogin() {
        setIsModalOpen(false)
    }

    return (
        <header className="app-header ">



            {user ? (
                <section className="logged-in-user">
                    <h2>Hello {user.fullname},</h2>
                    {user.isAdmin && (<h2>admin</h2>)}
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (

                <section className="no-logged-in-user">
                    <LoginSignup />
                    <button className="demo-login" onClick={openDemoLogin}>Try demo login!</button>
                </section>


            )}
            {isModalOpen && <LoginModal closeDemoLogin={closeDemoLogin} />}

            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>


    )
}