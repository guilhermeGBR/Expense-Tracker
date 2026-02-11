import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import ExpenseList from "../components/ExpenseList"

function Dashboard(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [expenses, setExpenses] = useState([])



    useEffect(() => {
        checkUser()
        fetchExpenses()
    }, [])


    async function fetchExpenses() {
        const {data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', {ascending: false})
        
        if(!error){
            setExpenses(data)
        }
    }


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
            <ExpenseList 
                expenses={expenses}
                onDelete={deleteExpense}
            />
        </div>
    )
    async function deleteExpense(id) {
        await supabase.from("expenses").delete().eq("id", id)
        fetchExpenses()
    }

    async function handleLogout(){
        await supabase.auth.signOut()
        navigate("/")
    }
}

export default Dashboard