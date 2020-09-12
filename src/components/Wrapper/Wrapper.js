import React from 'react';
import { TalentsProvider } from '../../contexts/TalentsContext';

const Wrapper = ({children}) => {
    return (
        <div className="app">
            <div className="calc-container">
                <h2 className="app-header">TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h2>
                <div className="talents-container">
                    <TalentsProvider>{children}</TalentsProvider>
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
