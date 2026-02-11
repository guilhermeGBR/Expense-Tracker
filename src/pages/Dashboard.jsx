import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import ExpenseList from "../components/ExpenseList"
import ExpenseForm from "../components/ExpenseForm"

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

    async function addExpense(expense) {
        const {data: sessionData} = await supabase.auth.getSession()

        const user = sessionData.session.user

        const { error } = await supabase.from("expenses").insert([
            {
                ...expense,
                user_id: user.id
            }
        ])

        if (error){
            console.error(error)
            return
        }
        fetchExpenses()
        
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <ExpenseForm onAddExpense={addExpense} />
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