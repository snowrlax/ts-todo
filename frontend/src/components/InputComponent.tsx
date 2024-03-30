import axios from "axios"
import { useState } from "react"

export const InputComponent = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    })

         
    return <div className="w-full">
        <div className="mb-3">
            <input type="text" onChange={(e) => {
                setInputs({
                    ...inputs, title: e.target.value
                })
            }}  placeholder="Title" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
        <div className="mb-6">
            <input type="text" onChange={(e) => {
                setInputs({
                    ...inputs, description: e.target.value
                })
            }} placeholder="Description" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="">
            <button onClick={ async() => {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
                    data: inputs
                })
                
            }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>
        </div>

    </div>
}