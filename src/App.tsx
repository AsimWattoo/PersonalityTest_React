import React from 'react';
import PageLayout from './pages/QuizPage';
import NewQuizPage from './pages/NewQuizPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import PreviewPage from './pages/QuestionsPreviewPage';

import store, {persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewQuizPage />} />
            <Route path="/quiz" element={<PageLayout />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

