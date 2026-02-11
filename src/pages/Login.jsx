import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkSession()
    }, [])

    async function checkSession() {
        const { data } = await supabase.auth.getSession()

        if (data.session) {
            navigate("/dashboard")
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    setLoading(false)

    if (error) {
        setError(error.message)
    } else {
        navigate("/dashboard")
    }
    }

    return (
        <div className="container">
        <div className="card">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <label>Senha</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    style={{ marginTop: "15px" }}
                    disabled={loading}
                >
                {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
        </div>
    )
}

export default Login
