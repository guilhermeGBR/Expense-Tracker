import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

function Register() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess("Conta criada com sucesso! Faça login.")
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }

        setLoading(false)
    }

    return(
        <div className="container">
            <div className="card">
                <h2>Criar Conta</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{color: "red"}}>{error}</p>}
                    {success && <p style={{color: "green"}}>{success}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Cadastrar"}
                    </button>
                </form>

                <p style={{marginTop: "10px"}}>
                    Já tem conta? <Link to="/">Fazer Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register