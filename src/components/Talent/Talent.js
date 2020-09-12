import React from 'react';
import './Talent.scss';
import { useTalentsDispatch, useTalents } from '../../contexts/TalentsContext';
import { MAX_POINTS } from '../../constants/Constants';

/*
A component to represent an individual Talent.
This component is responsible for sending dispatches to TalentsContext
to update the selected state of itself in the list of talents there.
It also recursively renders additional Talent components if the current Talent has any children.
*/
const Talent = ({talent}) => {
    const dispatch = useTalentsDispatch();
    const {talents, pointsSpent} = useTalents();

    // Returns true if this talent has children and any of them are selected
    const anyChildrenSelected = () => {
        let childSelected = false;
        if (talent.children) {
            for (let i = 0; i < talent.children.length; i++) {
                const child = talent.children[i];
                const stateChild = talents.find(t => t.id === child);
                if (stateChild && stateChild.selected) {
                    childSelected = true;
                    break;
                }
            }
        }
        return talent.children && childSelected;
    }

    // Returns true if this talent has a parent and if it is selected
    const isParentSelected = () => {
        const parent = talents.find(t => t.children && t.children.indexOf(talent.id) !== -1);
        return parent === undefined || parent.selected;
    }

    // Returns true if this talent is selected and either has no children, or has children but none are selected
    const isLastSelectedInPath = () => {
        let childUnselected = talent.children && !!talent.children.find(child => !child.selected);
        return talent.selected && (!talent.children || childUnselected);
    }

    // Returns true if this talent meets all the criteria for being clickable
    const isToggleable = () => {
        return (pointsSpent < MAX_POINTS || isLastSelectedInPath()) && !anyChildrenSelected() && isParentSelected();
    }

    const toggleTalent = () => {
        if (isToggleable()) { // Only toggle the talent if it meets the criteria for being toggleable
            dispatch({type: 'toggleSelected', payload: talent.id});
            dispatch({type: 'updatePointsSpent', payload: talent.selected ? -1 : 1});
        }
    };

    return (
        <>
            <span className={`talent ${talent.selected ? 'selected' : ''} ${!isToggleable() ? 'locked' : ''} ${talent.id}`} 
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
