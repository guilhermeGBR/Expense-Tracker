function ExpenseItem({expense, onDelete}) {
    return (
        <div className="card expemse-item">
            <div className="expense-info">
                <h3>{expense.description}</h3>
                <p>Cateoria: {expense.category}</p>
                <p>Data: {expense.date}</p>
            </div>
            <div>
                <p className="expense-amount">
                    R$ {Number(expense.amount).toFixed(2)}
                </p>
                <button onClick={() => onDelete(expense.id)}>
                    Deletar
                </button>
            </div>
        </div>
    )
}

export default ExpenseItem