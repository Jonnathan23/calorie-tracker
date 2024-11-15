
import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityAction } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityAction>
}

const initialActivity: Activity = {
    id: 'sss', //TODO: Agregar el v4 --> npm i uud, npm i --save-dev @types/uuid
    category: 1,
    name: '',
    calories: 0
}


export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialActivity)

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity

        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialActivity,
            id: 'sss' //TODO: Agregar la funcion vs4 -> uuid4()
        })

    }

    return (
        <>
            <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categorias</label>
                    <select
                        id="category"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        placeholder="Ej. Comida, Jugo de Naranja, Ensalda, Ejercicio, Pesas, Bicicleta"
                        value={activity.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias</label>
                    <input
                        id="calories"
                        type="number"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        placeholder="Calorias, ej. 300 o 500"
                        value={activity.calories}
                        onChange={handleChange}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full  p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'}
                    disabled={!isValidActivity()}
                />

            </form>
        </>
    )
}