import { all } from "redux-saga/effects";
import landingPageSagas from "./landingPageSaga";

export default function* rootSaga() {
    yield all([
        ...landingPageSagas,
    ]);
}