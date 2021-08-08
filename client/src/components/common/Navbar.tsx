import React, {useState} from "react";
import {Button, Form, FormControl, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import icon from "../../assets/demo-store-logo.png";
import {useDispatch} from "react-redux";
import {getVideos} from "../../actions/landingPageActions";

const NavbarComponent = () => {

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState("")

    const handleSearchClick = () => {
        dispatch(getVideos({page: 1, query: keyword}))
    }

    return (
        <Navbar bg="white" expand="lg" data-testid={"navbar-main"}>
            <Navbar.Brand as={Link} to="/">
                <img src={icon} height="30" alt=""/>
            </Navbar.Brand>
            <Form className="d-flex" data-testid={"search-bar"}>
                <FormControl
                    type="search"
                    placeholder="Search title/desc"
                    className="mr-2"
                    aria-label="Search title or description"
                    data-testid={"search-bar-input"}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button disabled={!keyword} className="ml-2" variant="light" onClick={() => handleSearchClick()}>Go</Button>
            </Form>

        </Navbar>
    );
};

export default NavbarComponent;
