import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { ActivityAction, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer"

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityAction>
}

type ActivityProviderProps = {
    children: ReactNode
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export default function ActivityProvider({ children }: ActivityProviderProps) {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}