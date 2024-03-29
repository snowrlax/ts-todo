import { useState } from "react"

export const Todo = ({ title, description, done }: { title: string, description: string, done: boolean }) => {
    const [done, setDone] = useState(done)
    return <div className="">
        <div className="">
            <input type="text" value={title} />
            <input type="text" value={description} />
        </div>
        <div className="">{done ? "Done" : "Not Done"}</div>
    </div>
}