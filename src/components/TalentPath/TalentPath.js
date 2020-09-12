import React from 'react';
import './TalentPath.scss';
import Talent from '../Talent/Talent';

/*
A component responsible for an entire row or "path" of talents.
It creates the first Talent component in a chain of Talents that are created recursively (see Talent.js).
*/
const TalentPath = ({root, num}) => {
    return (
        <div className="talent-path">
            <div className="path-name">TALENT PATH {num}</div>
            <Talent key={root.id} talent={root} />
        </div>
    );
};

export default TalentPath;
