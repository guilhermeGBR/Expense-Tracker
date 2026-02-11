import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"

function Dashboard(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
            navigate("/")
        }else{
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

    async function handleLogout(){
        await supabase.auth.signOut()
        navigate("/")
    }
}

export default Dashboard
