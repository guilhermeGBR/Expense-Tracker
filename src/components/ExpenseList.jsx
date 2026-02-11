import ExpenseItem from "./ExpenseItem"
function ExpenseList({ expenses, onDelete}) {
    if(!expenses || expenses.length === 0){
        return <p>Nenhuma despesa cadastrada.</p>
    }

    return (
        <div>
            {expenses.map((expense) => (
                <ExpenseItem 
                    key={expense.id} 
                    expense={expense} 
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default ExpenseList