import * as React from "react";
import {useEffect, useState} from "react";
import classnames from "classnames/bind";
import styles from "./LandingPageComponent.scss";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getVideos} from "../../../actions/landingPageActions";
import {getVideosSelector, getVideosTotalSelector} from "../../../selectors/landingPageSelectors";
import {IVideo} from "../../../types/feature/LandingPageComponentTypes";

const cx = classnames.bind(styles);

const LandingPageComponent = () => {
    const dispatch = useDispatch();

    const videos = useSelector(getVideosSelector);
    const totalVideos = useSelector(getVideosTotalSelector);
    const [page, setPage] = useState(1);
    const maxPages = Math.ceil(totalVideos / 5);
    console.log("maxPages", maxPages);

    useEffect(() => {
        initializeVideos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(getVideos({page}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const initializeVideos = () => {
        dispatch(getVideos({page: 1}));
    }

    const renderVideos = () => {
        return videos.length > 0 ? (
            videos.map((video, idx) =>
                <Col key={video.id.toString()} xs={12} className={cx("justify-content-center")}>
                    {renderVideoCard(video)}
                    {page === maxPages && idx === videos.length - 1 && renderBackToHomeBtn()}
                </Col>
            )
        ) : (
            <div>
                No videos found matching criteria.
                {renderBackToHomeBtn()}
            </div>
        )
    }

    const renderBackToHomeBtn = () => {
        return <Button variant={'light'} onClick={() => initializeVideos()}>Back to
            home</Button>
    }

    const renderVideoCard = (video: IVideo) => {
        return (
            <Card data-testid={`video-${video.id}`} className={cx("product-card")} key={video.id.toString()}>
                <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
                <Card.Body>
                    <Card.Title>{video.title || "Video title not found"}</Card.Title>
                    <Card.Text
                        className={cx("description")}>{video.description || "Video description not found"}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const renderPagination = () => {
        // const maxPages = Math.ceil(totalVideos / 5);
        const array = Array.from({length: maxPages}, (_, i) => i + 1);

        return array.length > 1 && array.map((num, idx) =>
            <span key={idx.toString()} data-testid={"pagination-link"}>
                <span data-testid={`pagination-link-${num}`} className={cx(num === page ? "selected-page" : "unselected-page")}
                      onClick={() => setPage(num)}>{num}
                </span>
                {idx !== array.length - 1 && ` | `}
            </span>)
    }

    return (
        <Container fluid data-testid={"container-landing"}>
            <Row className={cx("justify-content-space-between", "text-center", "landing-page")}>
                <Col xs={12} className={cx("justify-content-center", "pagination-col")}>
                    {renderPagination()}
                </Col>
            </Row>
            <Row className={cx("justify-content-space-between", "text-center", "landing-page")}>
                {renderVideos()}
            </Row>
            <Row className={cx("justify-content-space-between", "text-center", "landing-page")}>
                <Col xs={12} className={cx("justify-content-center", "pagination-col")}>
                    {renderPagination()}
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPageComponent;

