import { Reducer } from "redux";
import {IVideo} from "../types/feature/LandingPageComponentTypes";
import {LandingPageActionTypes} from "../actions/landingPageActions";

export interface IState {
    videos: IVideo[];
    total: number;
}

const initialState: IState = {
    videos: [],
    total: 0,
}

const reducer: Reducer<IState> = (state = initialState, action) => {
    switch(action.type) {
        case LandingPageActionTypes.SET_VIDEOS:
            return {...state, videos: action.payload};
        case LandingPageActionTypes.SET_VIDEOS_TOTAL:
            return {...state, total: action.payload}
        default:
            return state;
    }
}

export {reducer as LandingPageReducer};