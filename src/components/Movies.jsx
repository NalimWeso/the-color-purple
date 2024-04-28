import { useState, useEffect } from "react";

function Movies() {
    const [movie, setMovie] = useState(null);
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
                // id: 873, 558915 9686
                const data = await response.json();

                const hours = Math.floor(data.runtime / 60);
                const minutes = data.runtime % 60;

                setMovie(data);
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

    return (
        // backdrop_path
        // year [done]
        // runtime [done]
        // director [done]
        // writer [done]
        // tagline [done]
        // overview [done]

        <>
            {movie ? (
                <div className="movie">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} (${year})`} />

                    <div className="info">
                        <h1>{year} Version, {runtime}</h1>
                        <h2>
                            Directed by{' '}
                            {director.map(({ id, name }, index) => (
                                <span key={id}>
                                    <a href={`https://www.themoviedb.org/person/${id}`} target="_blank">{name}</a>
                                    {index !== director.length - 1 && ', '}
                                </span>
                            ))}
                        </h2>

                        <h2>
                            Writed by{' '}
                            {writer.map(({ id, name }, index) => (
                                <span key={id}>
                                    <a href={`https://www.themoviedb.org/person/${id}`} target="_blank">{name}</a>
                                    {index !== writer.length - 1 && ', '}
                                </span>
                            ))}
                        </h2>
                        <p>{tagline}</p>
                        <p>{overview}</p>
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

export default Movies