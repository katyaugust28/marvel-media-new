import React, { useState } from 'react';
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './login-view.css';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://marvel-media-api.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                console.log(response)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", response.data.user.Username)
                window.location.replace("/movies")
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Form className="login justify-content-md-center">
            <Form.Group id="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group id="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            Not a member yet <Link to="/register">  sign up </Link>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};