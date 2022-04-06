import axios from 'axios';
const API_BASE = 'https://gp-js-test.herokuapp.com/pizza/'

const getInfo = async (url) => {
  const response = await axios.get(`${API_BASE}${url}`);
  return response.data;
};

export const getParticipantsInfo = async () => getInfo('guests')

export const getDietsInfo  = async (namesOfParticipants) => getInfo(`world-diets-book/${namesOfParticipants}`)