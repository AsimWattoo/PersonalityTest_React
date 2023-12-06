import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import PageLayout from './pages/QuestionsPage';
import NewQuizPage from './pages/NewQuizPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import QuestionPreviewPage from './pages/QuestionsPreviewPage';
import PresentationPreviewPage from './pages/PresentationPreviewPage';

import store, {persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PresentationPage from './pages/PresentationPage';
import PresentationPlayPage from './pages/PresentationPlayPage';
import QuestionsPlayPage from './pages/QuestionsPlayPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NewQuizPage />} />
              <Route path="/quiz/questions/:id" element={<PageLayout />} />
              <Route path="/quiz/preview/questions/:id" element={<QuestionPreviewPage />} />
              <Route path="/quiz/preview/presentation/:id" element={<PresentationPreviewPage />} />
              <Route path="/quiz/presentation/:id" element={<PresentationPage />} />
              <Route path='/quiz/play/presentation/:id' element={<PresentationPlayPage />} />
              <Route path='/quiz/play/questions/:id' element={<QuestionsPlayPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
