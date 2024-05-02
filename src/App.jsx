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
            {/* id: 873, 558915, 9686 */}
        </>
    );
}

export default App