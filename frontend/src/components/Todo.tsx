import axios from "axios"
import { useState } from "react"

export const Todo = ({ id, title, description, done }: { id: string, title: string, description: string, done: boolean }) => {

    const [completed, setCompleted] = useState(done)
    const [todoTitle, setTodoTitle] = useState(title);
    const [todoDescription, setTodoDescription] = useState(description);

   
    return <div className="flex ">
        <div className="flex justify-center">
            <input onChange={(e) => {
                setTodoTitle(e.target.value);
            }} type="text" value={todoTitle} />

            <input onChange={(e) => {
                setTodoDescription(e.target.value)
            }} type="text" value={todoDescription} />
        </div>

        <button onClick={() => {
            setCompleted(completed!)
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`, {
                data: {
                    done: completed
                }
            })
        }} className="">{done ? "Done" : "Not Done"}</button>

        <button onClick={() => {
            setCompleted(completed!)
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/todo/${id}`, {
                data: {
                    title: todoTitle,
                    description: todoDescription
                }
            })
        }} className="">update</button>
    </div>
}