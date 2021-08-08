import {call, fork, put, takeEvery} from "redux-saga/effects";
import {LandingPageActionTypes, setVideos, setVideosTotal} from "../actions/landingPageActions";
import {IVideoRequest} from "../types/feature/LandingPageComponentTypes";

export function* getVideos_(action: {type: LandingPageActionTypes.GET_VIDEOS, payload: IVideoRequest}) {
    try {
        const {page, query} = action.payload
        let endpoint = `/api/videos?page=${page||""}&query=${query||""}`;

        const response = yield call(fetch, endpoint);
        const data = yield response.json();

        yield put(setVideos(data["results"]));
        yield put(setVideosTotal(data["total"]));
    } catch(e) {
        console.error("getProducts of landingPageSaga failed", e);
    }
}

export const request = (url: string, options: {method: string, body: any}) => {
    return fetch(url, options);
}

function* watchLanding() {
    yield takeEvery(LandingPageActionTypes.GET_VIDEOS, getVideos_);
}

const landingPageSagas = [fork(watchLanding)];

export default landingPageSagas;