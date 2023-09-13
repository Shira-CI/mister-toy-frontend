import { NavLink, useNavigate } from "react-router-dom"
import { LoginSignup } from "./login.signup"
import { useSelector, useDispatch } from 'react-redux'

import { useEffect, useState, useRef } from 'react'
import { logout, login } from '../store/user.action.js'
import { LoginModal } from '../cmps/login.modal.jsx'

import { ShoppingCart } from '../cmps/shopping.cart.jsx'
import { SET_CART_IS_SHOWN } from '../store/cart.reducer.js'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.user)
    const isCartShown = useSelector((storeState) => storeState.cartModule.isCartShown)

    const dispatch = useDispatch()

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userMenuRef = useRef(null)
    const navigate = useNavigate()
    // console.log(user, 'user')
    // console.log(isUserMenuOpen , 'isUserMenuOpen')
    // console.log(isModalOpen , 'isModalOpen')

    useEffect(() => {
        setIsLoggedIn(user)
    }, [user])

    // useEffect(() => {

    //     function handleClickOutside(event) {
    //         if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
    //             setIsUserMenuOpen(false);
    //         }
    //     }

    //     // Attach the event listener
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         // Clean up the event listener when the component unmounts
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    async function onLogout() {
        setIsUserMenuOpen(false)
        try {
            navigate('/')
            await logout()
            // showSuccessMsg(`Bye now`)
            // console.log('logout')
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
    function onUserGreet() {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    return (
        <header className="app-header ">
            <div className="main-header">
                <div className="logo" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="Logo" />
                </div>


                {user ? (
                    <section className="logged-in-user">
                        <span className="user-greet" onClick={onUserGreet}>Hello, {user.fullname}</span>

                        {isUserMenuOpen && <span className="user-menu" ref={userMenuRef}>
                            <button className="logout-btn" onClick={onLogout}>Logout</button>
                        </span>}

                        {(!user.isAdmin) && <span>wallet: {user.wallet}$</span>  }

                    </section>

                ) : (
                        <section className="no-logged-in-user">
                            <LoginSignup />
                            <button className="demo-login-btn" onClick={openDemoLogin}>Try demo login!</button>
                        </section>
                    )}

                {isModalOpen && <LoginModal closeDemoLogin={closeDemoLogin} login={login} logout={logout} />}

            </div>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
                }}>
                    🛒 Cart
                </a>
            </nav>

        </header>


    )
}