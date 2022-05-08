import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_API_URL } from '../HomePage';

import SearchBox from '../SearchBox';
import './styles.css'

import { Movie } from '../MovieDetails';

export type Movies = Movie[]

const MovieList = () => {

    const [movies, setMovies] = useState<Movies>([])
    const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/movies`)
        .then(response => response.json())
        .then((json) => {
        console.log('json', json)
        if (json.Search) {
            setMovies(json.Search);
        }
        })
        window.localStorage.setItem('searchValue', searchValue);
        submitSearch()
    }, [searchValue])

    const submitSearch = async () => {
        window.localStorage.setItem('searchValue', searchValue);
        const result = await fetch(`${REACT_APP_API_URL}/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: searchValue })
        })
        const resultInJson = await result.json()
        console.log('resultInJson', resultInJson)

        fetch(`${REACT_APP_API_URL}/movies`)
        .then(response => response.json())
        .then((json) => {
        console.log('json', json)
        if (json.Search) {
            setMovies(json.Search);
        } else if (json.Error) {
            localStorage.setItem((searchValue), '')
            setErrorMessage(json.Error);
        }
        })
    }

    return (
        <>
            <div id="navbar">
            <h1>Mooviz</h1>
            <SearchBox searchValue={searchValue}
                setSearchValue={setSearchValue}
                submitSearch={submitSearch} />
            </div>
            {errorMessage && 
                <p className='error'>{errorMessage}</p>
            }
            <div className="container">
                {movies &&
                    movies.map((movie: any) => (
                        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} >
                            <div className='card'>
                                <div className='poster-box'>
                                    <img className="poster" src={movie.Poster} alt={`${movie.Title} poster`} />
                                </div>
                                <p className='card-title'>{movie.Title}</p>
                                <span className="card-description">{movie.Type}</span>
                                <span className="card-description">Year: {movie.Year}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}

export default MovieList;