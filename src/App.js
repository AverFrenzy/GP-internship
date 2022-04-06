import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { FeedbackTable, FeedbackWindow } from './components';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <FeedbackTable /> } />
      <Route path='/guests/:id' element={ <FeedbackWindow /> } />
    </Routes>
  );
};

export default App;

