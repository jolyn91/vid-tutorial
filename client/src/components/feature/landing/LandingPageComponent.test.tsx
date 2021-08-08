import {fireEvent, render} from '@testing-library/react';
import configureStore, {MockStore} from "redux-mock-store";
import LandingPageComponent from "./LandingPageComponent";
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import NavbarComponent from "../../common/Navbar";
import mockVideos from "../../../../../api/data/mockVideos";
import {LandingPageActionTypes} from "../../../actions/landingPageActions";

describe("Vid tutorial - frontend", () => {
    let store: MockStore;
    const mockStore = configureStore([]);

    beforeEach(() => {
        jest.useFakeTimers();
         store = mockStore({
            router: {},
            landing: {
                videos: mockVideos.slice(0,5),
                total: 10
            }
        })
    })

    const renderComponent = () => render(
        <Provider store={store}>
            <Router>
                <NavbarComponent/>
                <LandingPageComponent/>
            </Router>
        </Provider>
    );

    it("should render the component", () => {
        const {getByTestId, getByText} = renderComponent();
        expect(getByTestId("container-landing")).toBeTruthy();

        expect(getByTestId("navbar-main")).toBeTruthy();
    })

    it("should load the first page of videos", () => {
        const {getByTestId, debug} = renderComponent();
        expect(getByTestId('video-1')).toBeTruthy();
        expect(getByTestId('video-2')).toBeTruthy();
        expect(getByTestId('video-3')).toBeTruthy();
        expect(getByTestId('video-4')).toBeTruthy();
        expect(getByTestId('video-5')).toBeTruthy();
    })

    it("should render pagination buttons upon first load", () => {
        const {getAllByTestId} = renderComponent();
        expect(getAllByTestId('pagination-link')).toBeTruthy();
    })

    it("upon clicking on page number, should dispatch action accordingly to call api", () => {
        const {getAllByTestId} = renderComponent()
        expect(getAllByTestId('pagination-link-2')).toBeTruthy();
        const firstElement = getAllByTestId('pagination-link-2')[0];
        fireEvent.click(firstElement);
        const action = [{
            type: LandingPageActionTypes.GET_VIDEOS,
            payload: {page: 2},
            meta: undefined,
            error: undefined
        }]
        expect(store.getActions()).toEqual(expect.arrayContaining(action));
    })

    it("upon entering search input, should dispatch action according to call api", () => {
        const {getByTestId, getByText} = renderComponent();
        expect(getByTestId("search-bar")).toBeTruthy();
        expect(getByTestId("search-bar-input")).toBeTruthy();
        fireEvent.change(getByTestId("search-bar-input"), {target: {value: 'test'}})
        jest.advanceTimersByTime(1000);
        fireEvent.click(getByText("Go"));
        const action = [{
            type: LandingPageActionTypes.GET_VIDEOS,
            payload: {page: 1, query: 'test'},
            meta: undefined,
            error: undefined
        }]
        expect(store.getActions()).toEqual(expect.arrayContaining(action));
    })



})