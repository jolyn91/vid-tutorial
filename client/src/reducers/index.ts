import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import {IState as LandingPageState, LandingPageReducer} from "./landingPageReducer";

export interface IAppRootState {
  landing: LandingPageState;
}

// combine all reducers
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    landing: LandingPageReducer,
  });

export default rootReducer;
