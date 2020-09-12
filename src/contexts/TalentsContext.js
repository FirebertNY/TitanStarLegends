import React, { createContext, useReducer, useContext } from 'react';
import { Talents } from '../constants/Constants';

const TalentsContext = createContext();
const TalentsDispatchContext = createContext();

// Updates the state based on the type of action dispatched
const TalentsReducer = (state, action) => {
    switch (action.type) {
        case 'toggleSelected':
            const talents = [...state.talents]; // shallow copy the talents from state
            const talentCopy = {...state.talents.find(t => t.id === action.payload)}; // shallow copy the specific talent from state
            talentCopy.selected = !talentCopy.selected; // toggle the copy's selected value
            talents[talents.findIndex(t => t.id === action.payload)] = talentCopy; // replace the talent in the copied array
            return {talents: talents, pointsSpent: talents.filter(t => t.selected).length}; // update state with the copied array
        case 'lock':
            const talents = [...state.talents];
            talents.find(t => t.id === action.payload.talent.id).locked = action.payload.lock;
            return {talents: talents, pointsSpent: state.pointsSpent};
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
