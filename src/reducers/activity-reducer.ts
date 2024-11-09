import { Activity } from "../types"

export type ActivityAction = 
    {type : 'save-activity', payload: { newActivity: Activity}}

type ActivityState = {
    activities: Activity[]
}

export const initialState:ActivityState = {
    activities: []
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityAction) => {
    if(action.type === 'save-activity'){
        console.log('Dedesde el type de save-activity')
    }

    return state
}

