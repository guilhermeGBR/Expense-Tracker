import { useState } from "react"

function ExpenseForm({onAddExpense}) {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (!description || !amount || !category || !date){
            alert("Preencha todos os campos")
            return
        }

        await onAddExpense({
            description,
            amount: parseFloat(amount),
            category,
            date
        })

        setDescription("")
        setAmount("")
        setCategory("")
        setDate("")
    }

    return(
        <form onSubmit={handleSubmit} className="card">
            <h2>Nova Despesa</h2>

            <input
                type="Text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input 
                type="number" 
                placeholder="Valor" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <input 
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit">Adicionar</button>
        </form>
    )
}

export default ExpenseForm