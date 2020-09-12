import React from 'react';
import './PointsTracker.scss';
import { useTalents } from '../../contexts/TalentsContext';
import { MAX_POINTS } from '../../constants/Constants';

// A component to display the number of spent vs available talent points
const PointsTracker = () => {
    const {pointsSpent} = useTalents();

    return (
        <div className="points-container"><div>{pointsSpent}/{MAX_POINTS}</div> Points Spent</div>
    );
};

export default PointsTracker;
