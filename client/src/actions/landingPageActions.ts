import { action } from "typesafe-actions";
import {IVideo, IVideoRequest} from "../types/feature/LandingPageComponentTypes";

export enum LandingPageActionTypes {
    GET_VIDEOS = "LANDING/GET_VIDEOS",
    SET_VIDEOS = "LANDING/SET_VIDEOS",
    SET_VIDEOS_TOTAL = "LANDING/SET_VIDEOS_TOTAL"
}

export const getVideos = (payload: IVideoRequest) => action(LandingPageActionTypes.GET_VIDEOS, payload);
export const setVideos = (videos: IVideo[]) => action(LandingPageActionTypes.SET_VIDEOS, videos);
export const setVideosTotal = (total: number) => action(LandingPageActionTypes.SET_VIDEOS_TOTAL, total);