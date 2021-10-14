import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './main-view.css';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {
    constructor() { //the moment a component is made in memory (the place to initialize a state's values)
        super(); //initializes your component's state- set to null initially
        this.state = {
            movies: [],
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }

    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://marvel-media-api.herokuapp.com/movies', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            this.setState({
                movies: response.data
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="https://marvel-media-api.herokuapp.com/movies">Marvel Media</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="https://marvel-media-api.herokuapp.com/users/:Username">Profile</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => { localStorage.setItem("token", ""); window.location.replace("/") }} >Log out</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <Row className="main-view justify-content-md-center">
                    {
                        this.state.movies.map(x => {
                            return (<MovieCard movie={x}></MovieCard>)
                        })
                    }

                </Row>
            </Router>
        );
    }

}

export default MainView;