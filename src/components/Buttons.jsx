import PropTypes from 'prop-types';

function Buttons({ setMovieId }) {
    return (
        <div className="buttons">
            <button onClick={() => setMovieId(873)} className="clicked">1985</button>
            <button onClick={() => setMovieId(558915)}>2023</button>
        </div>
    );
}

Buttons.propTypes = {
    setMovieId: PropTypes.number.isRequired
}

export default Buttons