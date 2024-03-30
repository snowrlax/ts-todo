import axios from "axios"
import { useEffect, useState } from "react"
import { Todo } from "./Todo"

async function getTodos() {
    const res = await axios.get("https://ts-todo-w23m.onrender.com/app/todo")
    console.log(res)
    return res
}

export const Todos = () => {
    const [Todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [])
    
    return <div className="">
        <Todo id={"1"} title={"test title"} description={"test description"} done={true} />
    </div>
}