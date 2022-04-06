import React, { createContext, useContext, useEffect, useState } from 'react';

import { getDietsInfo, getParticipantsInfo } from '../../services/pizzaService';


const PartyContext = createContext();

export const usePartyContext = () => useContext(PartyContext);

export const PartyContextProvider = ({ children }) => {
  const [partyInfo, setPartyInfo] = useState([]);
  const [extraFields, setExtraFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const participantsData = await getParticipantsInfo();
      const dietData = await getDietsInfo(participantsData.party.map(person => person.name));
      const vegansList = dietData.diet.filter(person => person.isVegan).map(person => person.name);
      const totalPartyInfo = participantsData.party.map((person, index) => {
        return {
          id: index + 1,
          name: person.name,
          eatsPizza: person.eatsPizza,
          isVegan: vegansList.includes(person.name),
          preRating: '3',
        };
      });
      setPartyInfo(totalPartyInfo);
      localStorage.setItem('totalPartyInfoStorage', JSON.stringify(totalPartyInfo));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFeedback = (guest, reset, navigate) => {
    const newPartyInfo = [...partyInfo];
    newPartyInfo.forEach((person) => {
      if (person.name === guest.name) {
        person.isAddedFeedback = false;
        delete person.isAddedFeedback;
        delete person.phoneNumber;
        delete person.feedbackComment;
        delete person.feedbackRating;
      }
    });
    reset();
    setPartyInfo(newPartyInfo);
    localStorage.removeItem('totalPartyInfoStorage');
    localStorage.setItem('totalPartyInfoStorage', JSON.stringify(newPartyInfo));
    navigate('/');
  };

  const chooseRating = (event, guest) => {
    const newPartyInfo = [...partyInfo];
    newPartyInfo.forEach((person) => {
      if (person.name === guest.name) {
        person.preRating = event.target.value;
      }
    });
    setPartyInfo(newPartyInfo);
  };

  const addFeedBack = (guest, data) => {
    const newPartyInfo = [...partyInfo];
    newPartyInfo.forEach((person) => {
      if (person.name === guest.name) {
        person.isAddedFeedback = true;
        person.feedbackRating = data.rating;
        person.phoneNumber = data.phoneNumber;
        person.preRating = '3';
        person.feedbackComment = data.feedbackComment;
      }
    });
    setPartyInfo(newPartyInfo);
    localStorage.removeItem('totalPartyInfoStorage');
    localStorage.setItem('totalPartyInfoStorage', JSON.stringify(newPartyInfo));
  };

  const addInput = (event) => {
    event.stopPropagation()
    const duplicateFields = [<input className='input-extra' key={extraFields.length}/>, ...extraFields];
    console.log(duplicateFields);
    setExtraFields(duplicateFields);
  };

  const refreshList = () => {
    localStorage.removeItem('totalPartyInfoStorage');
    fetchData();
  };

  useEffect(() => {
    if (localStorage.hasOwnProperty('totalPartyInfoStorage')) {
      setPartyInfo(JSON.parse(localStorage.getItem('totalPartyInfoStorage')));
    } else {
      fetchData();
    }
  }, []);

  const value = {
    partyInfo,
    isLoading,
    addFeedBack,
    chooseRating,
    refreshList,
    deleteFeedback,
    extraFields,
    addInput
  };

  return (
    <PartyContext.Provider value={ value }>
      { children }
    </PartyContext.Provider>
  );
};
