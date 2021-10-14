import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import './registration-view.css';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://marvel-media-api.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // the second argument '_self' makes it so the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            });
    }
    return (
        <Form className="register justify-content-md-center">
            <Form.Group id="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group id="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group id="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group id="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </Form.Group>
            Already a member, <Link to="/"> sign in </Link>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    );

    RegistrationView.propTypes = {
        register: PropTypes.shape({
            Username: PropTypes.string.isRequired,
            Password: PropTypes.string.isRequired,
            Email: PropTypes.string.isRequired,
            Birthday: PropTypes.string.isRequired
        }),
    }
};