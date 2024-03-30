import { InputComponent } from "../components/InputComponent"
import { Todos } from "../components/Todos"

export const HomePage = () => {
    return <div className="flex flex-col justify-center h-screen bg-slate-200">
        <div className="flex justify-center">
            <div className="bg-blue-200 ">
                <div className="text-3xl mb-12 font-bold">Task Mgmt</div>
                <div className="">
                    <InputComponent  />
                    <Todos />
                </div>
            </div>
        </div>
    </div>
}