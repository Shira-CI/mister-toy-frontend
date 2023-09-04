import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { CredentialsForm } from './credentials-form.jsx'
import { Fragment, useState } from 'react'
import { login, signup } from '../store/user.action.js'

// const { useState } = React

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)

    function onSubmit(credentials) {
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    async function onLogin(credentials) {
        // console.log('onLogin')
        if (!credentials.username) return
        try {
            const user = await login(credentials)
            // console.log(user)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        if (!credentials.username || !credentials.password || !credentials.fullname)
            return
        await signup(credentials)
        console.log('signup')
    }
    return (
        <div className="credentials-page">
            <CredentialsForm
                onSubmit={onSubmit}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
