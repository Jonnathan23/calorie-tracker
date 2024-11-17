import { Activity } from "../types"

export type ActivityAction =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } }


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState: ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityAction): ActivityState => {

    if (action.type === 'save-activity') {

        let updatetivities: Activity[] = []

        if (state.activeId) {
            updatetivities = state.activities.map(activity => state.activeId === activity.id ? action.payload.newActivity : activity)

        } else {
            updatetivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatetivities,
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }

    }

    return state
}

