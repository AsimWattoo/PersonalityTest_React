import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import PageLayout from './pages/QuizPage';
import NewQuizPage from './pages/NewQuizPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import PreviewPage from './pages/PreviewPage';

import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PresentationPage from './pages/PresentationPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewQuizPage />} />
            <Route path="/quiz/questions/:id" element={<PageLayout />} />
            <Route path="/quiz/preview/:id" element={<PreviewPage />} />
            <Route path="/quiz/presentation/:id" element={<PresentationPage />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
