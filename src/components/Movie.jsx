import { useState, useEffect } from "react";

function Movie() {
    const [movie, setMovie] = useState({
        id: null,
        title: null,
        year: null,
        runtime: null,
        poster: null,
        director: null,
        writer: null,
        tagline: null,
        overview: null
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/873?api_key=7f0e9b5e25babb2fe0d751bf7e14f1f0&append_to_response=credits');
                const data = await response.json();
                // id: 873, 558915 9686

                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;

                setMovie({
                    id: data.id,
                    title: data.title,
                    year: data.release_date.slice(0, 4),
                    runtime: `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'min' : ''}`,
                    poster: data.poster_path,
                    director: data.credits.crew.filter(({ job }) => job === 'Director').map(({ id, name }) => ({ id, name })),
                    writer: data.credits.crew.filter(({ job }) => job === 'Screenplay' || job === 'Writer').map(({ id, name }) => ({ id, name })),
                    tagline: data.tagline ? `"${data.tagline}"` : `"${data.title}"`,
                    overview: data.overview
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchMovie();
    }, [])

    const renderCredits = (credits) => (
        <>
            {credits.map(({ id, name }, index) => (
                <span key={id}>
                    <a href={`https://www.themoviedb.org/person/${id}`} target="_blank">{name}</a>
                    {index !== credits.length - 1 && ', '}
                </span>
            ))}
        </>
    );

    return (
        <>
            {movie.id ? (
                <div className="movie">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster}`} alt={`${movie.title} (${movie.year})`} />

                    <div className="info">
                        <div className="data">
                            <h1>{movie.year} Version, {movie.runtime}</h1>
                            <h2>Directed by {renderCredits(movie.director)}</h2>
                            <h2>Writed by {renderCredits(movie.writer)}</h2>
                            <p>{movie.tagline}</p>
                            <p>{movie.overview}</p>
                        </div>

                        <div className="link">
                            <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank">Explore on TMDB</a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="movie">
                    <h1 className="loading">Loading...</h1>
                </div>
            )}
        </>
    );
}

export default Movie