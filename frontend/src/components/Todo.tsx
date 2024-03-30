import axios from "axios"
import { useState } from "react"

export const Todo = ({ id, title, description, done }: { id: string, title: string, description: string, done: boolean }) => {
    const [completed, setCompleted] = useState(done)
    const [updatedInputs, setUpdatedInputs] = useState({
        title: "",
        description: ""
    })
    return <div className="">
        <div className="flex justify-center">
            <input onChange={(e) => {
                setUpdatedInputs({
                    ...updatedInputs, title: e.target.value
                })
            }} type="text" value={title} />
            <input onChange={(e) => {
                setUpdatedInputs({
                    ...updatedInputs, description: e.target.value
                })
            }} type="text" value={description} />
        </div>
        <button onClick={() => {
            setCompleted(completed!)
            axios.put(`https://ts-todo-w23m.onrender.com/app/todos/${id}`, {
                data: {
                    done: completed
                }
            })
        }} className="">{done ? "Done" : "Not Done"}</button>
        <button onClick={() => {
            setCompleted(completed!)
            axios.put(`https://ts-todo-w23m.onrender.com/app/todos/${id}`, {
                data: {
                    done: completed
                }
            })
        }} className="">update</button>
    </div>
}