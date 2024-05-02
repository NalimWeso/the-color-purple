import Header from "./components/Header";
import Buttons from "./components/Buttons";
import Movie from "./components/Movie";
import { useState } from "react";

function App() {
    const [movieId, setMovieId] = useState(873);

    return (
        <>
            <Header />
            <Buttons setMovieId={setMovieId} />
            <Movie id={movieId} />
        </>
    );
}

export default App