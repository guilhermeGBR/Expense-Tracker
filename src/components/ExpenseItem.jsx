function ExpenseItem({expense, onDelete}) {
    return (
        <div className='card'>
            <h3>{expense.description}</h3>
            <p>Valor: R$ {Number(expense.amount).toFixed(2)}</p>
            <p>Categoria: {expense.category}</p>
            <p>Data: {expense.date}</p>

            <button onClick={() => onDelete(expense.id)}>
                Deletar
            </button>
        </div>
    )
}

export default ExpenseItem