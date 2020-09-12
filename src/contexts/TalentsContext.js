import React, { createContext, useReducer, useContext } from 'react';
import { Talents } from '../constants/Constants';

const TalentsContext = createContext();
const TalentsDispatchContext = createContext();

// Updates the state based on the type of action dispatched
const TalentsReducer = (state, action) => {
    switch (action.type) {
        case 'toggleSelected':
            return Object.assign({}, state, {
                talents: state.talents.map(talent => {
                    if (talent.id === action.payload) {
                        return Object.assign({}, talent, {
                            selected: !talent.selected
                        });
                    }
                    return talent;
                })
            });
        case 'updatePointsSpent':
            return Object.assign({}, state, {
                pointsSpent: state.pointsSpent + action.payload
            });
        default:
            throw new Error(`Action type ${action.type} not handled`);
    }
}

const TalentsProvider = ({children}) => {
    const [state, dispatch] = useReducer(TalentsReducer, {talents: Talents, pointsSpent: 0});
    return (
        <TalentsContext.Provider value={state}>
            <TalentsDispatchContext.Provider value={dispatch}>
                {children}
            </TalentsDispatchContext.Provider>
        </TalentsContext.Provider>
    );
}

const useTalents = () => {
    const context = useContext(TalentsContext);
    if (context === undefined) {
        throw new Error('useTalents must be used within a TalentsProvider');
    }
    return context;
}

const useTalentsDispatch = () => {
    const context = useContext(TalentsDispatchContext);
    if (context === undefined) {
        throw new Error('useTalents must be used within a TalentsProvider');
    }
    return context;
}

export { TalentsProvider, useTalents, useTalentsDispatch };
