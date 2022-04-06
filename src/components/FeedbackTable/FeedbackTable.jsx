import React from 'react';
import { Link } from 'react-router-dom';

import { usePartyContext } from '../contexts/PartyContext';
import PizzaCutSVG from '../svg/PizzaCutSVG';
import './index.css';


export const FeedbackTable = () => {
  const { partyInfo, refreshList, isLoading } = usePartyContext();

  const guestsNames = partyInfo.map((person, index) => {
    return (
      <li key={ index + 'person name' } data-testid='guest-name' className={ person.isVegan ? 'vegan-text' : null }>
        { person.eatsPizza ?
          <>
            <PizzaCutSVG />
            <Link to={ `/guests/${ person.id }` }>
              { person?.isAddedFeedback ? `✔️ ${ person.name }` : person.name }
            </Link>
          </> : person.name }
      </li>
    );
  });

  return (
    <div data-testid='feedback-table' className='feedback-table'>
      <button data-testid='refresh-button' className='refresh-button' disabled={ isLoading } onClick={ refreshList }>Refresh</button>
      <ul data-testid='guests-list'>
        { guestsNames }
      </ul>
    </div>
  );
};
