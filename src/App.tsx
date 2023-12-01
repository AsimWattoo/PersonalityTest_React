import React from 'react';
import PageLayout from './PageLayout';
import NewQuizPage from './pages/NewQuizPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewQuizPage />} />
        <Route path="/Quiz" element={<PageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

