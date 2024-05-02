import PropTypes from 'prop-types';
import { useState } from 'react';

function Buttons({ setMovieId }) {
    const [classOne, setClassOne] = useState('clicked');
    const [classTwo, setClassTwo] = useState(null);

    function clickButton(num, btn) {
        setMovieId(prev => prev !== num ? num : prev);
        setClassOne(btn === 1 ? 'clicked' : null);
        setClassTwo(btn === 2 ? 'clicked' : null);
    }

    return (
        <div className="buttons">
            <button onClick={() => clickButton(873, 1)} className={classOne}>1985</button>
            <button onClick={() => clickButton(558915, 2)} className={classTwo}>2023</button>
        </div>
    );
}

Buttons.propTypes = {
    setMovieId: PropTypes.number.isRequired
}

export default Buttons