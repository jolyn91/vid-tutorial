import * as bodyParser from "body-parser";
import * as express from "express";
import { Logger } from "../logger/logger";
import mockVideos from "../data/mockVideos";

export interface IVideo {
    id: number;
    title: string;
    description: string;
    embedId: string;
}

class Video {

    public express: express.Application;
    public logger: Logger;

    // array to hold videos
    public videos: IVideo[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.videos = mockVideos;
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // request to get all the videos by page number
        this.express.get("/videos", (req, res, next) => {
            this.logger.info("url:" + req.url);

            let query: string = req.query.query as string;
            let page: string = req.query.page as string;

            const pageSize = 5;
            const pageNoFormatted = Number(page) || 1;

            const videos = query ? this.videos.filter(function(video) {
                const titleFormatted = video.title.toLowerCase();
                const descriptionFormatted = video.description.toLowerCase();
                if ( titleFormatted.includes(query.toLowerCase()) || descriptionFormatted.includes(query.toLowerCase())) {
                    return video;
                }
            }) : this.videos;

            const paginatedVideos = videos.slice((pageNoFormatted - 1) * pageSize, pageNoFormatted * pageSize);

            res.json({results: paginatedVideos, total: videos.length});
        });
    }
}

export default new Video().express;