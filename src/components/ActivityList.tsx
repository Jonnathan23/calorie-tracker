import { Dispatch, useMemo } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityAction } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityAction>
}
export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    //?Porque se usa esto:
    //? En lugar de esto --> categories[ac.category - 1].name
    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            {activities.map(ac => (
                <div key={ac.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${ac.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>{categoryName(+ac.category)}</p>
                        <p className="text-2xl font-bold pt-5">{ac.name}</p>
                        <p className="font-black text-4xl text-lime-500">{ac.calories} {' '} <span>Calorias</span></p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({ type: 'set-activeId', payload: { id: ac.id } })}
                        >
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>
                    </div>
                </div>
            ))}

        </>
    )
}