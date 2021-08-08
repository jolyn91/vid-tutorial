import mockVideos from "../data/mockVideos";
import * as request from "supertest";
import * as app from '../index'

describe('Vid tutorial - api', () => {
    it('given no search input or page number, should get first page of videos (default)', async () => {
        const res = await request(app)
            .get('/api/videos');
        expect(res.statusCode).toEqual(200);
        const videos = mockVideos.slice(0, 5); // page 1 of results
        expect(res.body["results"]).toEqual(expect.arrayContaining(videos));
        expect(res.body["total"]).toEqual(10);
    });

    it("given page number, should get videos by page", async () => {
        const res = await request(app)
            .get('/api/videos?page=2');
        expect(res.statusCode).toEqual(200);
        const videos = mockVideos.slice(5, 10); // page 2 of results
        expect(res.body["results"]).toEqual(expect.arrayContaining(videos));
        expect(res.body["total"]).toEqual(10);
    })


    it("given search input, should get videos by querying description and page", async () => {
        const res = await request(app)
            .get('/api/videos?page=1&query=learn%20to%20wash%20your%20hands');
        expect(res.statusCode).toEqual(200);
        const expectedByDescription = {
            results: [{
                id: 3,
                title: "Wash my hands Song",
                description: "Learn to wash your hands, children.",
                embedId: "7POwnMsx-wY"
            }],
            total: 1
        };
        expect(res.body).toEqual(expectedByDescription);
    })

    it("given search input, should get videos by querying title and page", async () => {
        const res = await request(app)
            .get('/api/videos?page=1&query=pronunciation%20practice');
        expect(res.statusCode).toEqual(200);
        const expectedByTitle = {
            results: [
                {
                    id: 1,
                    title: "Pronunciation practice - Animals",
                    description: "Test description for Pronunciation practice - Animals",
                    embedId: "pG_KSxAvj5I"
                },
                {
                    id: 2,
                    title: "Pronunciation practice - Clothes",
                    description: "Test description for Pronunciation practice - Clothes",
                    embedId: "c46HDJ7NYXc"
                },
                {
                    id: 5,
                    title: "Pronunciation practice - Transportation",
                    description: "Test description for Pronunciation practice - Transportation",
                    embedId: "YHAaDZ3bxNY"
                }
            ],
            total: 3
        };
        expect(res.body).toEqual(expectedByTitle);
    })
})