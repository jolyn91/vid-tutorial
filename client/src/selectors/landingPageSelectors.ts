import { IAppRootState } from "../reducers";
import { createSelector } from "reselect";

const videosSelector = (state: IAppRootState) => state.landing.videos;
const videosTotalSelector = (state: IAppRootState) => state.landing.total;

export const getVideosSelector = createSelector(
    videosSelector,
    (data) => data
);

export const getVideosTotalSelector = createSelector(
    videosTotalSelector,
    (data) => data
);