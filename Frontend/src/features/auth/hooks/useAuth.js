import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return { success: true }
        } catch (err) {
            return { success: false, message: err.message }
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return { success: true }
        } catch (err) {
            return { success: false, message: err.message }
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            console.error("Logout failed", err)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}