import { useState, useEffect } from "react";

function Movies() {
    const [movie, setMovie] = useState(null);
    const [year, setYear] = useState(null);
    const [director, setDirector] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/873?api_key=7f0e9b5e25babb2fe0d751bf7e14f1f0&append_to_response=credits'); // id: 873, 558915
                const data = await response.json();

                setMovie(data);
                setYear(`(${data.release_date.slice(0, 4)})`);
                setDirector(data.credits.crew.filter(({ job }) => job === 'Director').map(({ name }) => name).join(', '));

                console.log(data.credits.crew.filter(({ job }) => job === 'Director').map(({ name }) => name));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchMovie();
    }, [])

    return (
        <>
            {movie ? (
                <div className="movie">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} ${year}`} />

                    <div className="info">
                        <h1>{movie.title} {year}</h1>
                        <h2>Directed by {director}</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
}

export default Movies