import React, { useEffect } from 'react';
import './Talent.scss';
import { useTalentsDispatch, useTalents } from '../../contexts/TalentsContext';
import { MAX_POINTS } from '../../constants/Constants';

/*
A component to represent an individual Talent.
This component is responsible for sending dispatches to TalentsContext
to update the selected and locked state of itself in the list of talents there.
It also recursively renders additional Talent components if the current Talent has any children.
*/
const Talent = ({talent}) => {
    const dispatch = useTalentsDispatch();
    const {talents, pointsSpent} = useTalents();

    const toggleTalent = () => {
        // Only toggle the talent if it's not locked, the user has points to spend,
        // or if the user is de-selecting the talent.
        if (!talent.locked && (talent.selected || pointsSpent < MAX_POINTS)) {
            dispatch({type: 'toggleSelected', payload: talent.id});
        }
    };

    // This useEffect is responsible for each Talent updating its own "locked" state
    // based on whether any of its children are selected, or if its parent talent is selected.
    useEffect(() => {
        // If the talent has children, it should be locked if any children are selected.
        let anyChildrenSelected = false;
        if (talent.children) {
            anyChildrenSelected = talent.children.some(c => {
                return talents.find(t => t.id === c).selected;
            });
        }

        // If the talent is a child of another talent, this talent should be locked if the parent is not selected.
        let isParentSelected = false;
        if (talent.root) {
            isParentSelected = true; // The root talents have no parents, so we will treat them as if they are selected.
        } else {
            isParentSelected = talents.some(t => {
                return t.children && t.children.indexOf(talent.id) !== -1 && t.selected;
            });
        }

        // We only want to send the dispatch if the state of the lock attribute is changing.
        const lock = anyChildrenSelected || !isParentSelected || (!talent.selected && pointsSpent === 6);
        if (lock !== talent.locked) {
            dispatch({type: 'lock', payload: {talent: talent, lock: lock}});
        }
    }, [talents, dispatch, pointsSpent, talent]);

    return (
        <>
            <span className={`talent ${talent.selected ? 'selected' : ''} ${talent.locked ? 'locked' : ''} ${talent.id}`} 
                title={talent.title} 
                onClick={toggleTalent}>
                <span className="talent-tooltip">
                    <h3>{talent.title}</h3>
                    <p>{talent.tooltip}</p>
                    <em>{talent.bonus}</em>
                </span>
            </span>
            {talent.children ? (
                <>
                    <span className={`connector ${talent.selected ? 'open' : ''}`} />
                    {talent.children.map(child => (
                        // We recursively tack Talent components onto the end as long as the current Talent has children
                        <Talent key={child} talent={talents.find(t => t.id === child)} />
                    ))}
                </>
            ) : null}
        </>
    );
};

export default Talent;
