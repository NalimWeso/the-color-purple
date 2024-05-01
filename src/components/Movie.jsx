import { useState, useEffect } from "react";

function Movie() {
    const [movie, setMovie] = useState(null);
    const [id, setId] = useState(null);
    const [year, setYear] = useState(null);
    const [runtime, setRuntime] = useState(null);
    const [director, setDirector] = useState(null);
    const [writer, setWriter] = useState(null);
    const [tagline, setTagline] = useState(null);
    const [overview, setOverview] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/873?api_key=7f0e9b5e25babb2fe0d751bf7e14f1f0&append_to_response=credits');
                const data = await response.json();
                // id: 873, 558915 9686

                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;

                setMovie(data);
                setId(data.id);
                setYear(data.release_date.slice(0, 4));
                setRuntime(`${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'min' : ''}`);
                setDirector(data.credits.crew.filter(({ job }) => job === 'Director').map(({ id, name }) => ({ id, name })));
                setWriter(data.credits.crew.filter(({ job }) => job === 'Screenplay' || job === 'Writer').map(({ id, name }) => ({ id, name })));
                setTagline(data.tagline ? `"${data.tagline}"` : `"${data.title}"`);
                setOverview(data.overview);
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
            {movie ? (
                <div className="movie">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} (${year})`} />

                    <div className="info">
                        <div className="data">
                            <h1>{year} Version, {runtime}</h1>
                            <h2>Directed by {renderCredits(director)}</h2>
                            <h2>Writed by {renderCredits(writer)}</h2>
                            <p>{tagline}</p>
                            <p>{overview}</p>
                        </div>

                        <div className="link">
                            <a href={`https://www.themoviedb.org/movie/${id}`} target="_blank">Explore on TMDB</a>
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