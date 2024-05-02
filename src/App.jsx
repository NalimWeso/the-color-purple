import Header from "./components/Header";
import Buttons from "./components/Buttons";
import Movie from "./components/Movie";

function App() {
    return (
        <>
            <Header />
            <Buttons />
            <Movie id={873} />
            {/* id: 873, 558915, 9686 */}
        </>
    );
}

export default App