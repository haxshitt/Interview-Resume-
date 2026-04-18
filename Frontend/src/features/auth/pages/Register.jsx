import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        const result = await handleRegister({ username, email, password })
        setSubmitting(false)

        if (!result.success) {
            // Check if it's a duplicate-email error and hint the user to log in
            const isDuplicate =
                result.message?.toLowerCase().includes("already") ||
                result.message?.toLowerCase().includes("exists") ||
                result.message?.toLowerCase().includes("duplicate")

            if (isDuplicate) {
                setError(
                    <>
                        A user with this email already exists.{" "}
                        <Link to="/login">Login instead?</Link>
                    </>
                )
            } else {
                setError(result.message)
            }
            return
        }

        navigate("/home", { replace: true })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button
                        className={`button primary-button${submitting ? ' loading' : ''}`}
                        disabled={submitting}
                    >
                        Register
                    </button>

                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register