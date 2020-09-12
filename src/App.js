import React from 'react';
import './App.scss';
import TalentPath from './components/TalentPath/TalentPath';
import PointsTracker from './components/PointsTracker/PointsTracker';
import { useTalents } from './contexts/TalentsContext';

const App = () => {
  const {talents} = useTalents();
  let pathNum = 1;

  return (
    <>
      <div className="paths-container">
        {talents.map(t => t.root ? (
          <TalentPath key={`path${pathNum}`} root={t} num={pathNum++} />
        ) : null)}
      </div>
      <PointsTracker />
    </>
  );
}

export default App;
