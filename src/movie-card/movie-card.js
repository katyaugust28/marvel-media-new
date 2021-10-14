import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import './movie-card.css';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movie-view/${movie._id}`}>
                        <Button variant="link">Learn More</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        //Genre: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string,
        }),
        Featured: PropTypes.bool.isRequired


    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};


//onMovieClick = prop function
//movie = prop object