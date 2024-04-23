import { useState, useEffect } from "react";

function Movies() {
    const [movie, setMovie] = useState(null);
    const [year, setYear] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/873?api_key=7f0e9b5e25babb2fe0d751bf7e14f1f0');
                // id: 873, 558915
                const data = await response.json();
                setMovie(data);
                setYear(`(${data.release_date.slice(0, 4)})`);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchMovie();
    }, [])

    return (
        <div>
            {movie ? (
                <div>
                    <h1>{movie.title} {year}</h1>
                    <p>{movie.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={`${movie.title} ${year}`} /> {/* width 400, normal: original */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Movies