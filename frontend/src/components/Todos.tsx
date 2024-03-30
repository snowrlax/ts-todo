import axios from "axios"
import { useEffect, useState } from "react"
import { Todo } from "./Todo"



export const Todos = () => {
    const [todos, setTodos] = useState([])

    async function getTodos() {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/todo`)
            .then(response => setTodos(response.data.response))
    }

    useEffect(() => {
        getTodos()
    }, [])

    return <div className="">
        {
            todos?.map(todo => (
                // @ts-ignore
                <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} done={todo.done} />
            ))
        }

    </div>
}